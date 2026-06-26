/**
 * LegalPageLayout — shared wrapper for Privacy, Terms, etc.
 */

import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import BrandLogo from '@/components/BrandLogo';

interface LegalPageLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export default function LegalPageLayout({ title, updated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F3F2]">
      <header className="bg-[#463C3C] text-white py-4">
        <div className="container flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-orange-100 hover:text-white text-sm font-['Inter'] transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <BrandLogo size="nav" />
        </div>
      </header>

      <main className="container py-12 md:py-16 max-w-3xl">
        <h1 className="font-['Barlow_Condensed'] font-800 text-4xl text-[#2D2626] mb-2">{title}</h1>
        <p className="text-gray-500 text-sm font-['Inter'] mb-10">Last updated: {updated}</p>
        <div className="prose-legal space-y-6 text-gray-700 font-['Inter'] text-sm leading-relaxed">
          {children}
        </div>
      </main>
    </div>
  );
}
