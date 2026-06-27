import { v2 as cloudinary } from 'cloudinary';
import { isCloudinaryUrl, normalizeImageSourceUrl } from '../shared/automation-image.js';

function configureCloudinary(): boolean {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return false;
  }
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  return true;
}

export interface ResolvedAutomationImage {
  url: string;
  imported: boolean;
  warning?: string;
}

/** Store remote image URLs on Cloudinary so the shop can load them reliably. */
export async function resolveAutomationImageUrl(
  image: string,
  options: { importRemote?: boolean } = {}
): Promise<ResolvedAutomationImage> {
  const trimmed = image.trim();
  if (!trimmed) return { url: '', imported: false };
  if (isCloudinaryUrl(trimmed)) return { url: trimmed, imported: false };

  const importRemote = options.importRemote !== false;
  if (!importRemote) return { url: trimmed, imported: false };

  if (!configureCloudinary()) {
    return {
      url: trimmed,
      imported: false,
      warning:
        'Cloudinary is not configured on the server. Add CLOUDINARY_* env vars or upload images in Admin.',
    };
  }

  try {
    const result = await cloudinary.uploader.upload(normalizeImageSourceUrl(trimmed), {
      folder: 'gwecely/products',
      resource_type: 'image',
    });
    return { url: result.secure_url, imported: true };
  } catch {
    return {
      url: trimmed,
      imported: false,
      warning:
        'Could not import image. Use a public link (Google Drive: share → Anyone with link), or upload in Admin.',
    };
  }
}
