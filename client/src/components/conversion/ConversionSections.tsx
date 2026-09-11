/**
 * Shared conversion sections for inner pages
 */

import { Link } from 'wouter';
import { ROUTES } from '@/lib/routes';
import { WHAT_HAPPENS_NEXT, WHY_POINTS, FAQ_ITEMS, TRUST_STRIP } from '@/lib/siteContent';
import { requestQuote } from '@/lib/booking';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export function TrustBar() {
  return (
    <section className="border-y border-[#E6E6E6] bg-white" aria-label="Workshop facts">
      <div className="container py-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_STRIP.map((item) => (
            <li key={item} className="text-sm text-[#404040] border-l-2 border-[#F05030] pl-3 font-[family-name:var(--font-body)]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RepairJourney({ compact = false }: { compact?: boolean }) {
  const steps = compact ? WHAT_HAPPENS_NEXT.slice(0, 4) : WHAT_HAPPENS_NEXT;
  return (
    <section className={compact ? '' : 'bg-[#F6F6F6]'} aria-labelledby="journey-heading">
      <div className={compact ? '' : 'container py-14 md:py-16'}>
        <div className="max-w-2xl mb-8">
          <p className="section-eyebrow">What happens next</p>
          <h2 id="journey-heading" className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading mb-3">
            From first contact to handover
          </h2>
          <p className="text-sm text-[#6B6B6B]">
            Where an insurer must approve work, approval remains with the insurer. We support estimates and documentation.
          </p>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((item) => (
            <li key={item.step} className="border border-[#E6E6E6] bg-white p-4">
              <p className="font-[family-name:var(--font-display)] font-bold text-[#F05030] text-sm mb-2">{item.step}</p>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-[#111111] mb-1 text-sm">{item.title}</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyGwecelySection({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="bg-white" aria-labelledby="why-heading">
      <div className="container py-14">
        <h2 id="why-heading" className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading mb-8">
          Why contact Gwecely
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WHY_POINTS.map((item) => (
            <li key={item.title} className="border-l-2 border-[#F05030] pl-4">
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-[#111111] mb-1">{item.title}</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ul>
        {showCta && (
          <Link href={ROUTES.whyGwecely} className="inline-block mt-8 text-sm font-semibold text-[#F05030]">
            More about Gwecely →
          </Link>
        )}
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="bg-[#F6F6F6]" aria-labelledby="faq-heading">
      <div className="container py-14 max-w-3xl">
        <h2 id="faq-heading" className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#111111] section-heading mb-6">
          Common questions
        </h2>
        <div className="divide-y divide-[#E6E6E6] border border-[#E6E6E6] bg-white">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="p-4">
              <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] font-semibold text-sm">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-[#6B6B6B] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LeadCtaBand({
  title = 'Send photos of the damage — we will guide the next step',
  text = 'WhatsApp is usually fastest. Or get a short quote online.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-[#141414] text-white">
      <div className="container py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl mb-2">{title}</h2>
          <p className="text-[#B0B0B0] text-sm">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsAppUrl(buildPhotoQuoteMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            data-conversion="whatsapp-lead-band"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Send photos on WhatsApp
          </a>
          <button type="button" onClick={() => requestQuote()} className="btn-gwecely">
            Get a quote
          </button>
        </div>
      </div>
    </section>
  );
}
