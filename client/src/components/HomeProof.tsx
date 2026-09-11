/**
 * HomeProof — editorial proof strip (replaces card sitemap)
 */

import { Link } from 'wouter';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin, Quote, Star } from 'lucide-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { BRAND } from '@/lib/brand';
import { GALLERY_IMAGES } from '@/lib/galleryImages';
import { ROUTES } from '@/lib/routes';
import { bookService } from '@/lib/booking';

export default function HomeProof() {
  const reduce = useReducedMotion();

  return (
    <section id="proof" className="bg-[#F5F3F2]">
      {/* Trust line */}
      <div className="border-b border-[#463C3C]/10 bg-white">
        <div className="container py-5 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm font-[family-name:var(--font-body)] text-[#463C3C]">
          <p className="inline-flex items-center gap-2">
            <MapPin size={15} className="text-[#F05A32] flex-shrink-0" />
            Behind CMC Motors, Mombasa
          </p>
          <p className="text-[#6E6E6E]">
            Panel beating · Spray painting · Fleet maintenance
          </p>
          <p className="inline-flex items-center gap-1.5 text-[#463C3C]">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            Trusted by motorists &amp; fleets on the coast
          </p>
        </div>
      </div>

      {/* Before / after editorial */}
      <div className="container py-16 md:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-2xl mb-10"
        >
          <p className="section-eyebrow">Workshop results</p>
          <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading mb-4">
            REAL WORK.
            <br />
            <span className="text-[#F05A32]">NOT STOCK PHOTOS.</span>
          </h2>
          <p className="text-[#6E6E6E] font-[family-name:var(--font-body)] leading-relaxed">
            Drag to compare a typical panel-beating job from our Mombasa bay — then book the same craft for your vehicle.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden rounded-sm shadow-lg"
        >
          <BeforeAfterSlider
            beforeSrc={GALLERY_IMAGES.dmaxDent}
            afterSrc={GALLERY_IMAGES.mercedesRespray}
            beforeLabel="Damaged"
            afterLabel="Finished"
            alt="Workshop bodywork comparison"
          />
        </motion.div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href={ROUTES.gallery}
            className="inline-flex items-center gap-2 text-[#F05A32] font-[family-name:var(--font-body)] text-sm font-semibold hover:text-[#D94E28] transition-colors"
          >
            View full gallery
            <ArrowRight size={15} />
          </Link>
          <button
            type="button"
            onClick={() => bookService('Panel Beating')}
            className="btn-secondary-gwecely text-sm py-2.5 px-5"
          >
            Book this service
          </button>
        </div>
      </div>

      {/* Quote + CTA */}
      <div className="bg-[#2D2626] text-white">
        <div className="container py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <blockquote className="relative">
            <Quote size={36} className="text-[#F05A32]/40 mb-4" />
            <p className="font-['Barlow_Condensed'] font-700 text-2xl md:text-3xl leading-snug mb-5">
              &ldquo;Their panel beating and spray painting work is exceptional — vehicles come back looking brand new.&rdquo;
            </p>
            <footer className="font-[family-name:var(--font-body)] text-sm text-white/60">
              <span className="text-white/90 font-medium">Peter Odhiambo</span>
              {' · '}Fleet Manager, Mombasa
            </footer>
            <Link
              href={ROUTES.reviews}
              className="inline-flex items-center gap-1.5 mt-5 text-[#F0826E] text-sm hover:text-white transition-colors"
            >
              More reviews
              <ArrowRight size={14} />
            </Link>
          </blockquote>

          <div>
            <h3 className="font-['Barlow_Condensed'] font-800 text-3xl md:text-4xl mb-3">
              READY FOR THE BAY?
            </h3>
            <p className="text-white/65 font-[family-name:var(--font-body)] text-sm leading-relaxed mb-6 max-w-md">
              Book online and we confirm within 2 hours. Or walk in behind CMC Motors on Bishop Macarios Road.
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => bookService('Vehicle Servicing')} className="btn-gwecely">
                Book Repair
              </button>
              <Link href={ROUTES.services} className="btn-outline-gwecely">
                Our services
                <ArrowRight size={16} />
              </Link>
            </div>
            <p className="mt-8 text-white/40 text-xs font-[family-name:var(--font-body)]">
              Also:{' '}
              <Link href={ROUTES.hospitality} className="text-white/55 hover:text-[#F0826E] underline-offset-2 hover:underline">
                hospitality supplies for hotels &amp; institutions
              </Link>
              {' · '}
              <Link href={ROUTES.about} className="text-white/55 hover:text-[#F0826E] underline-offset-2 hover:underline">
                about {BRAND.legalName}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
