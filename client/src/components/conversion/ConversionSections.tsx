/**
 * Shared section primitives for conversion pages
 */

import { Link } from 'wouter';
import { Check, Phone } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { ROUTES } from '@/lib/routes';
import { TRUST_POINTS, REPAIR_JOURNEY, WHY_GWECELY, FAQ_ITEMS } from '@/lib/siteContent';
import { requestQuote } from '@/lib/booking';
import { buildQuoteQuickMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export function TrustBar() {
  return (
    <section className="border-y border-[#E6E6E6] bg-white" aria-label="Why customers choose Gwecely">
      <div className="container py-10 md:py-12">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TRUST_POINTS.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F05030]/10 text-[#F05030]">
                <Check size={12} strokeWidth={3} />
              </span>
              <div>
                <p className="font-[family-name:var(--font-display)] font-semibold text-sm text-[#111111] mb-1">
                  {item.title}
                </p>
                <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RepairJourney({ compact = false }: { compact?: boolean }) {
  const steps = compact ? REPAIR_JOURNEY.slice(0, 4) : REPAIR_JOURNEY;
  return (
    <section className={compact ? '' : 'bg-[#F6F6F6]'} aria-labelledby="journey-heading">
      <div className={compact ? '' : 'container py-14 md:py-20'}>
        <div className="max-w-2xl mb-10">
          <p className="section-eyebrow">From accident to road</p>
          <h2 id="journey-heading" className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading mb-4">
            A clear repair process
          </h2>
          <p className="text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
            Knowing what happens next reduces stress after an accident. Where an insurer must approve work, we support
            the documentation — approval remains with your insurer.
          </p>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <li key={item.step} className="border border-[#E6E6E6] bg-white p-5">
              <p className="font-[family-name:var(--font-display)] font-bold text-[#F05030] text-sm mb-2">
                {item.step}
              </p>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-[#111111] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
        {!compact && (
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={ROUTES.insuranceClaims} className="btn-secondary-gwecely text-xs">
              Insurance &amp; claims process
            </Link>
            <button type="button" onClick={() => requestQuote('Accident Repairs')} className="btn-gwecely text-xs">
              Get a quote
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export function WhyGwecelySection({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="bg-white" aria-labelledby="why-heading">
      <div className="container py-14 md:py-20">
        <div className="max-w-2xl mb-10">
          <p className="section-eyebrow">Why Gwecely</p>
          <h2 id="why-heading" className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading mb-4">
            Built around workshop work — not vague promises
          </h2>
          <p className="text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
            Differentiation that matters when you are choosing who handles your vehicle after an accident or for fleet
            maintenance.
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_GWECELY.map((item) => (
            <li key={item.title} className="border-l-2 border-[#F05030] pl-5 py-1">
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-[#111111] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
        {showCta && (
          <div className="mt-10">
            <Link href={ROUTES.whyGwecely} className="text-sm font-semibold text-[#F05030] hover:text-[#D9482A]">
              Read more about why Gwecely →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="bg-[#F6F6F6]" aria-labelledby="faq-heading">
      <div className="container py-14 md:py-20">
        <div className="max-w-2xl mb-10">
          <p className="section-eyebrow">FAQ</p>
          <h2 id="faq-heading" className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading">
            Common questions
          </h2>
        </div>
        <div className="max-w-3xl divide-y divide-[#E6E6E6] border border-[#E6E6E6] bg-white">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group p-5 md:p-6">
              <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] font-semibold text-[#111111] flex justify-between gap-4">
                {item.q}
                <span className="text-[#F05030] group-open:rotate-45 transition-transform text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed pr-8">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LeadCtaBand({
  title = 'Ready to start a repair or assessment?',
  text = 'Request a quotation online, call the workshop, or WhatsApp vehicle details and damage photos.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-[#111111] text-white">
      <div className="container py-12 md:py-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl mb-3">{title}</h2>
          <p className="text-[#B0B0B0] text-sm font-[family-name:var(--font-body)] leading-relaxed">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => requestQuote()} className="btn-gwecely">
            Get a quote
          </button>
          <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="btn-outline-gwecely">
            <Phone size={16} />
            Call us
          </a>
          <a
            href={whatsAppUrl(buildQuoteQuickMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <WhatsAppIcon className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
