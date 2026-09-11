import { IMAGES } from '@/lib/images';

type BrandLogoProps = {
  size?: 'nav' | 'footer' | 'hero';
  className?: string;
};

const sizeClasses = {
  nav: 'h-11 sm:h-12 md:h-14 max-w-[180px] sm:max-w-[210px]',
  footer: 'h-14 sm:h-16 max-w-[240px]',
  hero: 'h-20 sm:h-24 max-w-[320px]',
};

export default function BrandLogo({ size = 'nav', className = '' }: BrandLogoProps) {
  return (
    <span className={`brand-logo-wrap inline-flex items-center justify-center ${className}`}>
      <img
        src={IMAGES.logo}
        alt="Gwecely Limited"
        className={`brand-logo-img w-auto object-contain object-left ${sizeClasses[size]}`}
      />
    </span>
  );
}
