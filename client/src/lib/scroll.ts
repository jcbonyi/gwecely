/** Smooth scroll with offset for fixed navbar */
export function scrollToSection(id: string, offset = 96) {
  const el = document.querySelector(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

export const SECTION_IDS = ['home', 'about', 'services', 'shop', 'booking', 'testimonials', 'gallery', 'contact'] as const;
