/**
 * AboutSection — company profile, mission, vision, and trust pillars
 */

import { useEffect, useRef, useState } from 'react';
import { Award, MapPin, Package, Wrench } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { IMAGES } from '@/lib/images';

const PILLARS = [
  {
    icon: Wrench,
    title: 'Full-Service Garage',
    desc: 'Mechanical, electrical, panel beating, and spray painting under one roof in Mombasa.',
  },
  {
    icon: Package,
    title: 'General Supplies',
    desc: 'Stationery, furniture, IT equipment, health & safety gear, and dry foods on demand.',
  },
  {
    icon: MapPin,
    title: 'Mombasa Based',
    desc: 'Behind CMC Motors, off Bishop Macarios Road — serving coast and nationwide clients.',
  },
  {
    icon: Award,
    title: 'Registered in Kenya',
    desc: 'Gwecely Limited — incorporated under the Companies Act, 2015.',
  },
];

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-20 md:py-28 bg-[#F5F3F2]">
      <div className="container">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F05A32]/10 text-[#F05A32] text-sm px-4 py-1.5 rounded-full mb-4 font-['Inter'] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32]" />
            About Gwecely
          </div>
          <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading">
            MECHANICAL EXPERTISE.
            <br />
            <span className="text-[#F05A32]">TRUSTED SUPPLIES.</span>
          </h2>
        </div>

        <div className={`grid lg:grid-cols-2 gap-10 items-center reveal ${visible ? 'visible' : ''}`}>
          <div className="relative rounded-2xl overflow-hidden shadow-lg min-h-[280px]">
            <img
              src={IMAGES.contact.mombasa}
              alt="Gwecely workshop and team, Mombasa"
              className="w-full h-full object-cover min-h-[280px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2626]/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-white font-['Barlow_Condensed'] font-700 text-xl">{BRAND.subtitle}</p>
              <p className="text-orange-100 text-sm font-['Inter'] mt-1">{BRAND.contact.address}</p>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-gray-700 font-['Inter'] leading-relaxed">{BRAND.about}</p>
            <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed">{BRAND.market}</p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <h3 className="font-['Barlow_Condensed'] font-700 text-[#F05A32] text-sm uppercase tracking-wide mb-2">Our Mission</h3>
                <p className="text-gray-600 text-sm font-['Inter'] leading-relaxed">{BRAND.mission}</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <h3 className="font-['Barlow_Condensed'] font-700 text-[#F05A32] text-sm uppercase tracking-wide mb-2">Our Vision</h3>
                <p className="text-gray-600 text-sm font-['Inter'] leading-relaxed">{BRAND.vision}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '120ms' }}>
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F05A32]/10 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-[#F05A32]" />
                </div>
                <h3 className="font-['Barlow_Condensed'] font-700 text-[#2D2626] mb-1.5">{pillar.title}</h3>
                <p className="text-gray-600 text-sm font-['Inter'] leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
