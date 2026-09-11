/**
 * TestimonialsSection — Gwecely Limited
 * Design: Dark navy background, white testimonial cards with auto-scrolling carousel
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { ROUTES } from '@/lib/routes';

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
      style={{ background: 'linear-gradient(135deg, #111111 0%, #404040 60%, #111111 100%)' }}
    >
      <div className="container">
        <div className="mb-14 max-w-2xl mx-auto text-center">
          <p className="section-eyebrow !text-[#F07058] justify-center [&::before]:bg-[#F05030]">
            Customer Reviews
          </p>
          <h2 id="testimonials-heading" className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-white section-heading centered">
            What clients say
          </h2>
          <p className="text-orange-100/85 font-[family-name:var(--font-body)] max-w-xl mx-auto mt-4">
            Hear from vehicle owners and fleet managers who trust our Mombasa workshop.
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
                  className={`glass-card p-6 transition-all duration-300 ${i === 1 ? 'scale-105 border-[#F07058]/40' : 'opacity-80'}`}
                >
                  <Quote size={28} className="text-[#F07058] mb-4 opacity-60" />
                  <p className="text-orange-50 font-[family-name:var(--font-body)] text-sm leading-relaxed mb-6">
                    "{t.review}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#F07058]/40"
                    />
                    <div>
                      <p className="font-[family-name:var(--font-display)] font-700 text-white text-sm">{t.name}</p>
                      <p className="text-orange-200 text-xs font-[family-name:var(--font-body)]">{t.role} · {t.location}</p>
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
              <Quote size={28} className="text-[#F07058] mb-4 opacity-60" />
              <p className="text-orange-50 font-[family-name:var(--font-body)] text-sm leading-relaxed mb-6">
                "{TESTIMONIALS[current].review}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={TESTIMONIALS[current].avatar}
                  alt={TESTIMONIALS[current].name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#F07058]/40"
                />
                <div>
                  <p className="font-[family-name:var(--font-display)] font-700 text-white text-sm">{TESTIMONIALS[current].name}</p>
                  <p className="text-orange-200 text-xs font-[family-name:var(--font-body)]">{TESTIMONIALS[current].role} · {TESTIMONIALS[current].location}</p>
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
                  i === current ? 'w-6 h-2 bg-[#F07058]' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
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

        <div className="mt-14 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-orange-100/80 font-[family-name:var(--font-body)] text-sm text-center sm:text-left max-w-md">
            Ready for the same craftsmanship? Book a bay slot — we confirm within 2 hours.
          </p>
          <Link href={ROUTES.quote} className="btn-gwecely text-sm py-2.5 px-6 flex-shrink-0">
            Get a Quote
          </Link>
        </div>
        <p className="text-center text-[#B0B0B0] text-xs font-[family-name:var(--font-body)] mt-8 border border-dashed border-white/20 p-4 max-w-2xl mx-auto">
          TODO: Replace sample testimonials below with verified customer reviews (name, vehicle/service, permission to
          publish). Do not treat the current quotes as live social proof.
        </p>
      </div>
    </section>
  );
}
