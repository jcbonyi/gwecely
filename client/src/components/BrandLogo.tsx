import { IMAGES } from '@/lib/images';

type BrandLogoProps = {
  size?: 'nav' | 'footer' | 'hero';
  className?: string;
};

const sizeClasses = {
  nav: 'h-12 sm:h-14 md:h-16 max-w-[200px] sm:max-w-[240px]',
  footer: 'h-16 sm:h-20 max-w-[280px]',
  hero: 'h-20 sm:h-24 max-w-[320px]',
};

export default function BrandLogo({ size = 'nav', className = '' }: BrandLogoProps) {
  return (
    <span
      className={`brand-logo-wrap inline-flex items-center justify-center ${className}`}
    >
      <img
        src={IMAGES.logo}
        alt="Gwecely Limited"
        className={`brand-logo-img w-auto object-contain object-left ${sizeClasses[size]}`}
      />
    </span>
  );
}
