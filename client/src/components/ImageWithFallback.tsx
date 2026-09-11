/**
 * ImageWithFallback — never render a broken/magenta image hole
 */

import { useState } from 'react';

const FALLBACK_SRC = '/images/workshop-bay-800.jpg';

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  fallbackSrc = FALLBACK_SRC,
}: Props) {
  const [current, setCurrent] = useState(src);
  const [failedOnce, setFailedOnce] = useState(false);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={() => {
        if (!failedOnce) {
          setFailedOnce(true);
          setCurrent(fallbackSrc);
        }
      }}
    />
  );
}
