import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/** Bottom-left on mobile to avoid sticky WhatsApp bar; bottom-right on desktop (FAB is right). */
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
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed z-40 w-11 h-11 rounded bg-[#404040] text-white flex items-center justify-center hover:bg-[#F05030] transition-colors focus-visible:ring-2 focus-visible:ring-[#F05030] focus-visible:ring-offset-2 left-4 max-md:bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:left-auto md:right-6 md:bottom-24"
    >
      <ArrowUp size={18} />
    </button>
  );
}
