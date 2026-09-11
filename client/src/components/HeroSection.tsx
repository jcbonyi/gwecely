/**
 * HeroSection — brand-first, full-bleed workshop hero
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, ChevronDown, MessageCircle } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { bookService } from '@/lib/booking';
import { buildServiceBookingQuickMessage, whatsAppUrl } from '@/lib/whatsapp';

const fadeUp = (delay: number, reduce: boolean | null) =>
  reduce
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] as const },
      };

export default function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover ${reduce ? '' : 'hero-ken-burns'}`}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(45,38,38,0.45) 0%, rgba(45,38,38,0.55) 40%, rgba(29,24,24,0.92) 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 pt-36 pb-24 md:pt-44 md:pb-28">
        <div className="max-w-3xl">
          <motion.p
            {...fadeUp(0.05, reduce)}
            className="font-['Barlow_Condensed'] font-800 text-[clamp(3.5rem,12vw,8rem)] leading-[0.85] tracking-tight text-white mb-5"
          >
            {BRAND.name}
          </motion.p>

          <motion.p
            {...fadeUp(0.15, reduce)}
            className="text-white/90 text-lg md:text-xl font-[family-name:var(--font-body)] max-w-xl mb-2 leading-snug"
          >
            Panel beating &amp; spray painting — Mombasa
          </motion.p>

          <motion.p
            {...fadeUp(0.22, reduce)}
            className="text-white/55 text-sm font-[family-name:var(--font-body)] mb-8"
          >
            Behind CMC Motors · Accident repairs · Fleet maintenance
          </motion.p>

          <motion.div {...fadeUp(0.3, reduce)} className="flex flex-wrap gap-3">
            <button type="button" onClick={() => bookService('Vehicle Servicing')} className="btn-gwecely text-base">
              <Calendar size={18} />
              Book Repair
            </button>
            <a
              href={whatsAppUrl(buildServiceBookingQuickMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gwecely text-base"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors z-10"
        aria-label="See workshop proof"
      >
        <ChevronDown size={28} className={reduce ? '' : 'animate-bounce'} />
      </button>
    </section>
  );
}
