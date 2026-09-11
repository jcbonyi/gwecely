import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

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
      className="fixed bottom-[5.5rem] md:bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#404040] text-white shadow-lg flex items-center justify-center hover:bg-[#F05030] transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#F05030] focus-visible:ring-offset-2 max-md:bottom-[calc(9.5rem+env(safe-area-inset-bottom,0px))]"
    >
      <ArrowUp size={18} />
    </button>
  );
}
