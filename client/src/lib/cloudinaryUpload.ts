import { apiUrl } from '@/lib/apiBase';

const MAX_BYTES = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT_MS = 60_000;

interface CloudinarySignature {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder: string;
}

function validateImageFile(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPEG, PNG, WebP, or GIF).');
  }
  if (file.size > MAX_BYTES) {
    throw new Error('Image must be 5 MB or smaller.');
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
      reject(new Error('Upload timed out. Check your connection and try again.'));
    }, UPLOAD_TIMEOUT_MS);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      window.clearTimeout(timer);
      try {
        const data = JSON.parse(xhr.responseText) as { secure_url?: string; error?: { message?: string } };
        if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
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

async function fetchUploadSignature(token: string): Promise<CloudinarySignature> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await fetch(apiUrl('/api/admin/upload-signature'), {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error((data as { error?: string }).error ?? `Signature request failed (${res.status})`);
    }
    return data as CloudinarySignature;
  } finally {
    window.clearTimeout(timer);
  }
}

async function uploadDirectToCloudinary(
  token: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  const { signature, timestamp, cloudName, apiKey, folder } = await fetchUploadSignature(token);

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', apiKey);
  form.append('timestamp', String(timestamp));
  form.append('signature', signature);
  form.append('folder', folder);

  return xhrUpload(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, form, onProgress);
}

async function uploadViaServer(
  token: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  const form = new FormData();
  form.append('image', file);

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);
  onProgress?.(10);

  try {
    const res = await fetch(apiUrl('/api/admin/upload'), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error((data as { error?: string }).error ?? `Upload failed (${res.status})`);
    }
    const url = (data as { url?: string }).url;
    if (!url) throw new Error('Upload failed — no URL returned');
    onProgress?.(100);
    return url;
  } finally {
    window.clearTimeout(timer);
  }
}

/** Upload product image — direct to Cloudinary when possible (fast), server fallback otherwise. */
export async function uploadProductImage(
  token: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  validateImageFile(file);
  onProgress?.(0);

  try {
    return await uploadDirectToCloudinary(token, file, onProgress);
  } catch (directError) {
    const message = directError instanceof Error ? directError.message : 'Direct upload failed';
    if (message.includes('Cloudinary not configured')) {
      throw directError;
    }
    try {
      return await uploadViaServer(token, file, onProgress);
    } catch {
      throw directError instanceof Error ? directError : new Error(message);
    }
  }
}
