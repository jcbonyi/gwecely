import { apiUrl } from '@/lib/apiBase';

const MAX_BYTES = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT_MS = 90_000;

interface CloudinarySignature {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder: string;
}

function isLocalDev(): boolean {
  return (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  );
}

function validateImageFile(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPEG, PNG, WebP, or GIF).');
  }
  if (file.size > MAX_BYTES) {
    throw new Error('Image must be 5 MB or smaller.');
  }
}

/** Resize/compress before upload — faster uploads, especially on mobile photos. */
async function prepareImage(file: File): Promise<File> {
  if (file.size < 400_000 && !file.type.includes('heic')) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const maxWidth = 1600;
    const scale = Math.min(1, maxWidth / bitmap.width);
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.85);
    });
    if (!blob) return file;

    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

function xhrUpload(
  url: string,
  form: FormData,
  onProgress?: (percent: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const timer = window.setTimeout(() => {
      xhr.abort();
      reject(new Error('Upload timed out. Try a smaller image or check your connection.'));
    }, UPLOAD_TIMEOUT_MS);

    xhr.upload.onprogress = (event) => {
      if (onProgress) {
        if (event.lengthComputable && event.total > 0) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        } else if (event.loaded > 0) {
          onProgress(Math.min(95, Math.round(event.loaded / 50_000)));
        }
      }
    };

    xhr.onload = () => {
      window.clearTimeout(timer);
      try {
        const data = JSON.parse(xhr.responseText) as { secure_url?: string; error?: { message?: string } };
        if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
          onProgress?.(100);
          resolve(data.secure_url);
          return;
        }
        reject(new Error(data.error?.message ?? `Upload failed (${xhr.status})`));
      } catch {
        reject(new Error('Upload failed — invalid response from Cloudinary'));
      }
    };

    xhr.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error('Network error during upload'));
    };

    xhr.onabort = () => {
      window.clearTimeout(timer);
      reject(new Error('Upload cancelled or timed out'));
    };

    xhr.open('POST', url);
    xhr.send(form);
  });
}

function unsignedCloudinaryConfig(): { cloudName: string; uploadPreset: string } | null {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;
  if (!cloudName?.trim() || !uploadPreset?.trim()) return null;
  return { cloudName: cloudName.trim(), uploadPreset: uploadPreset.trim() };
}

async function uploadWithUnsignedPreset(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  const config = unsignedCloudinaryConfig();
  if (!config) {
    throw new Error('Cloudinary upload preset is not configured');
  }

  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', config.uploadPreset);
  form.append('folder', 'gwecely/products');

  onProgress?.(5);
  return xhrUpload(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, form, (p) =>
    onProgress?.(5 + Math.round(p * 0.95))
  );
}

async function fetchUploadSignature(token: string): Promise<CloudinarySignature> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 20_000);

  try {
    const res = await fetch(apiUrl('/api/admin/upload-signature'), {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      throw new Error('API unavailable — set VITE_CLOUDINARY_UPLOAD_PRESET on Vercel for direct uploads');
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error((data as { error?: string }).error ?? `Signature request failed (${res.status})`);
    }
    return data as CloudinarySignature;
  } finally {
    window.clearTimeout(timer);
  }
}

async function uploadWithSignedPreset(
  token: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  onProgress?.(5);
  const { signature, timestamp, cloudName, apiKey, folder } = await fetchUploadSignature(token);

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', apiKey);
  form.append('timestamp', String(timestamp));
  form.append('signature', signature);
  form.append('folder', folder);

  onProgress?.(10);
  return xhrUpload(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, form, (p) =>
    onProgress?.(10 + Math.round(p * 0.9))
  );
}

async function uploadViaServer(
  token: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  const form = new FormData();
  form.append('image', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const timer = window.setTimeout(() => {
      xhr.abort();
      reject(new Error('Upload timed out'));
    }, UPLOAD_TIMEOUT_MS);

    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable && event.total > 0) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      window.clearTimeout(timer);
      try {
        const data = JSON.parse(xhr.responseText) as { url?: string; error?: string };
        if (xhr.status >= 200 && xhr.status < 300 && data.url) {
          onProgress?.(100);
          resolve(data.url);
          return;
        }
        reject(new Error(data.error ?? `Upload failed (${xhr.status})`));
      } catch {
        reject(new Error('Upload failed'));
      }
    };

    xhr.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error('Network error during upload'));
    };

    xhr.open('POST', apiUrl('/api/admin/upload'));
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send(form);
  });
}

/** Upload product image directly to Cloudinary (fast). Server proxy only in local dev. */
export async function uploadProductImage(
  token: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  validateImageFile(file);
  onProgress?.(1);

  const prepared = await prepareImage(file);
  onProgress?.(3);

  // Fastest: unsigned preset — no API round-trip (set on Vercel)
  if (unsignedCloudinaryConfig()) {
    return uploadWithUnsignedPreset(prepared, onProgress);
  }

  // Signed upload via API signature, then direct to Cloudinary
  try {
    return await uploadWithSignedPreset(token, prepared, onProgress);
  } catch (directError) {
    const message = directError instanceof Error ? directError.message : 'Direct upload failed';

    if (message.includes('Cloudinary not configured')) {
      throw new Error(
        'Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET on Vercel, or set CLOUDINARY_* on your API host.'
      );
    }

    // Slow server proxy — local dev only
    if (isLocalDev()) {
      try {
        return await uploadViaServer(token, prepared, onProgress);
      } catch {
        /* fall through */
      }
    }

    throw new Error(
      `${message}. For fast uploads on Vercel, add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET (unsigned preset in Cloudinary dashboard).`
    );
  }
}
