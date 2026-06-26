/**
 * TestimonialsSection — Gwecely Limited
 * Design: Dark navy background, white testimonial cards with auto-scrolling carousel
 */

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { IMAGES } from '@/lib/images';

const TESTIMONIALS = [
  {
    name: 'James Mwangi',
    role: 'Toyota Hilux Owner',
    location: 'Mombasa',
    rating: 5,
    review: 'Gwecely fixed my Hilux engine issue in one day. The technicians are highly professional and the pricing is very fair. I have been a loyal customer for 5 years now.',
    avatar: IMAGES.testimonials.james,
  },
  {
    name: 'Grace Achieng',
    role: 'Business Owner',
    location: 'Nairobi',
    rating: 5,
    review: 'We source all our office supplies and IT equipment through Gwecely. Reliable delivery, genuine products, and excellent customer service. Highly recommended for businesses.',
    avatar: IMAGES.testimonials.grace,
  },
  {
    name: 'Peter Odhiambo',
    role: 'Fleet Manager',
    location: 'Mombasa',
    rating: 5,
    review: 'Managing a fleet of 20 vehicles, Gwecely is our go-to workshop. Their panel beating and spray painting work is exceptional — vehicles come back looking brand new.',
    avatar: IMAGES.testimonials.peter,
  },
  {
    name: 'Sarah Njeri',
    role: 'Nissan X-Trail Owner',
    location: 'Mombasa',
    rating: 5,
    review: 'After my accident, I was worried about my car. Gwecely handled the panel beating and respray perfectly. You cannot tell there was ever any damage. Amazing work!',
    avatar: IMAGES.testimonials.sarah,
  },
  {
    name: 'David Kimani',
    role: 'Toyota Corolla Owner',
    location: 'Kilifi',
    rating: 4,
    review: 'Ordered genuine spare parts online and they delivered to Kilifi the next day. The parts were exactly as described and my mechanic confirmed they were OEM quality.',
    avatar: IMAGES.testimonials.david,
  },
  {
    name: 'Fatuma Hassan',
    role: 'School Principal',
    location: 'Mombasa',
    rating: 5,
    review: 'We procure all our school stationery, furniture, and safety equipment through Gwecely. Their procurement service saves us time and money. Truly a one-stop shop.',
    avatar: IMAGES.testimonials.fatuma,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          fill={s <= rating ? '#F59E0B' : 'none'}
          className={s <= rating ? 'text-amber-400' : 'text-gray-600'}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const total = TESTIMONIALS.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [total, paused]);

  const prev = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    setCurrent(c => (c - 1 + total) % total);
  };

  const next = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    setCurrent(c => (c + 1) % total);
  };

  // Show 3 at a time on desktop, 1 on mobile
  const getVisible = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((current + i) % total);
    }
    return indices;
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 md:py-28"
      aria-labelledby="testimonials-heading"
      style={{ background: 'linear-gradient(135deg, #2D2626 0%, #463C3C 60%, #2D2626 100%)' }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 text-orange-100 text-sm px-4 py-1.5 rounded-full mb-4 font-['Inter']">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32]" />
            Customer Reviews
          </div>
          <h2 id="testimonials-heading" className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-white section-heading centered">
            TRUSTED ACROSS
            <br />
            <span className="text-[#F0826E]">KENYA</span>
          </h2>
          <p className="text-orange-100 font-['Inter'] max-w-xl mx-auto mt-4">
            Hear from vehicle owners, fleet managers, and businesses who rely on Gwecely for workshop services and supplies across the coast and beyond.
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`reveal ${visible ? 'visible' : ''}`}
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Desktop: 3 cards */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {getVisible().map((idx, i) => {
              const t = TESTIMONIALS[idx];
              return (
                <div
                  key={idx}
                  className={`glass-card p-6 transition-all duration-300 ${i === 1 ? 'scale-105 border-[#F0826E]/40' : 'opacity-80'}`}
                >
                  <Quote size={28} className="text-[#F0826E] mb-4 opacity-60" />
                  <p className="text-orange-50 font-['Inter'] text-sm leading-relaxed mb-6">
                    "{t.review}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#F0826E]/40"
                    />
                    <div>
                      <p className="font-['Barlow_Condensed'] font-700 text-white text-sm">{t.name}</p>
                      <p className="text-orange-200 text-xs font-['Inter']">{t.role} · {t.location}</p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={t.rating} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: single card */}
          <div className="md:hidden">
            <div className="glass-card p-6">
              <Quote size={28} className="text-[#F0826E] mb-4 opacity-60" />
              <p className="text-orange-50 font-['Inter'] text-sm leading-relaxed mb-6">
                "{TESTIMONIALS[current].review}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={TESTIMONIALS[current].avatar}
                  alt={TESTIMONIALS[current].name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#F0826E]/40"
                />
                <div>
                  <p className="font-['Barlow_Condensed'] font-700 text-white text-sm">{TESTIMONIALS[current].name}</p>
                  <p className="text-orange-200 text-xs font-['Inter']">{TESTIMONIALS[current].role} · {TESTIMONIALS[current].location}</p>
                </div>
                <div className="ml-auto">
                  <StarRating rating={TESTIMONIALS[current].rating} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
                className={`transition-all duration-200 rounded-full ${
                  i === current ? 'w-6 h-2 bg-[#F0826E]' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-14 border-t border-white/10">
          {[
            { value: '7', label: 'Service Lines' },
            { value: 'Mombasa', label: 'Workshop Location' },
            { value: 'OEM', label: 'Genuine Parts' },
            { value: 'Kenya-wide', label: 'Delivery Available' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-['Barlow_Condensed'] font-800 text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-orange-200 text-sm font-['Inter']">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-orange-200/70 text-xs font-['Inter'] mt-6">
          Sample reviews for demonstration. Replace with verified client testimonials.
        </p>
      </div>
    </section>
  );
}
