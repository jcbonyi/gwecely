import { Home } from 'lucide-react';
import { useLocation } from 'wouter';
import BrandLogo from '@/components/BrandLogo';
import { BRAND } from '@/lib/brand';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F6F6F6] px-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <BrandLogo size="hero" />
        </div>

        <p className="font-[family-name:var(--font-display)] font-800 text-7xl text-[#F05030] leading-none mb-2">404</p>
        <h1 className="font-[family-name:var(--font-display)] font-700 text-2xl text-[#111111] mb-3">Page Not Found</h1>
        <p className="text-gray-600 font-[family-name:var(--font-body)] mb-8 leading-relaxed">
          The page you requested does not exist. Head back to {BRAND.legalName} to explore our services and shop.
        </p>

        <button
          type="button"
          onClick={() => setLocation('/')}
          className="btn-gwecely text-sm py-2.5 px-6 mx-auto"
        >
          <Home size={16} />
          Back to Home
        </button>
      </div>
    </div>
  );
}
