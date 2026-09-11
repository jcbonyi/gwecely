/**
 * ResponsivePicture — WebP + JPEG srcset with dimensions (CLS-safe)
 */

type Props = {
  /** Path prefix without size/ext, e.g. /images/hero → hero-400.webp */
  baseName: string;
  alt: string;
  className?: string;
  /** Available widths on disk for this base (default 400/800) */
  widths?: number[];
  sizes?: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Set false when WebP derivatives are missing */
  includeWebp?: boolean;
};

export default function ResponsivePicture({
  baseName,
  alt,
  className = '',
  widths = [400, 800],
  sizes = '(max-width: 768px) 100vw, 800px',
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  includeWebp = true,
}: Props) {
  const webpSrcSet = widths.map((w) => `${baseName}-${w}.webp ${w}w`).join(', ');
  const jpgSrcSet = widths.map((w) => `${baseName}-${w}.jpg ${w}w`).join(', ');
  const fallback = `${baseName}-${widths[widths.length - 1]}.jpg`;

  return (
    <picture>
      {includeWebp ? <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} /> : null}
      <source type="image/jpeg" srcSet={jpgSrcSet} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        sizes={sizes}
        onError={(e) => {
          const img = e.currentTarget;
          if (!img.dataset.fallback) {
            img.dataset.fallback = '1';
            img.src = '/images/workshop-bay-800.jpg';
          }
        }}
      />
    </picture>
  );
}
