/**
 * About — quiet workshop profile (no shouty caps / pills)
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { Package, Wrench } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { IMAGES } from '@/lib/images';
import { ROUTES } from '@/lib/routes';
import OpeningHours from '@/components/OpeningHours';

const PILLARS = [
  {
    icon: Wrench,
    title: 'Motor vehicle garage',
    desc: 'Panel beating, spray painting, accident repairs, servicing, mechanical work, and fleet maintenance in Mombasa.',
  },
  {
    icon: Package,
    title: 'Supporting services',
    desc: 'Automotive parts, corporate procurement, and hospitality supplies — available for clients who already trust the workshop.',
  },
] as const;

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-14 md:py-20 bg-[#F6F6F6]">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="section-eyebrow">About Gwecely</p>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading mb-4">
            A Mombasa workshop behind CMC Motors
          </h1>
          <p className="brand-tagline text-sm mb-4">{BRAND.tagline}</p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-10 items-start reveal ${visible ? 'visible' : ''}`}>
          <div className="relative overflow-hidden rounded-lg min-h-[280px] bg-[#141414]">
            <img
              src={IMAGES.booking.workshop}
              alt="Gwecely Limited workshop bay in Mombasa"
              className="w-full h-full object-cover min-h-[280px]"
              loading="lazy"
              width={800}
              height={600}
            />
          </div>

          <div className="space-y-5">
            <p className="text-[#404040] font-[family-name:var(--font-body)] leading-relaxed text-base">
              {BRAND.about}
            </p>
            <p className="text-[#6B6B6B] font-[family-name:var(--font-body)] text-sm leading-relaxed">
              {BRAND.mission}
            </p>
            <p className="text-[#6B6B6B] font-[family-name:var(--font-body)] text-sm leading-relaxed select-all">
              {BRAND.contact.address}
              <br />
              {BRAND.contact.poBox}
            </p>
            <OpeningHours className="text-sm text-[#6B6B6B]" />
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={ROUTES.quote} className="btn-gwecely text-sm">
                Get a quote
              </Link>
              <Link href={ROUTES.contact} className="btn-secondary-gwecely text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className={`grid sm:grid-cols-2 gap-5 mt-12 reveal ${visible ? 'visible' : ''}`}>
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="surface-card bg-white p-5">
                <div className="w-10 h-10 rounded bg-[#F05030]/10 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-[#F05030]" />
                </div>
                <h2 className="font-[family-name:var(--font-display)] font-semibold text-[#111111] mb-1.5">
                  {pillar.title}
                </h2>
                <p className="text-[#6B6B6B] text-sm font-[family-name:var(--font-body)] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
