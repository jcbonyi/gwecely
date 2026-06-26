import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { scrollToSection } from '@/lib/scroll';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => scrollToSection('#home', 0)}
      aria-label="Back to top"
      className="fixed bottom-[5.5rem] right-6 z-40 w-11 h-11 rounded-full bg-[#463C3C] text-white shadow-lg flex items-center justify-center hover:bg-[#F05A32] transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#F05A32] focus-visible:ring-offset-2"
    >
      <ArrowUp size={18} />
    </button>
  );
}
