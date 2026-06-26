/**
 * GallerySection — Gwecely Limited
 * Filterable closeup workshop gallery with lightbox
 */

import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/galleryImages';

const GALLERY_FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'mechanical', label: 'Mechanical Repairs' },
  { id: 'panel-beating', label: 'Panel Beating' },
  { id: 'spray-painting', label: 'Spray Painting' },
  { id: 'restoration', label: 'Vehicle Restoration' },
  { id: 'supplies', label: 'Office & Supplies' },
  { id: 'it-equipment', label: 'IT Equipment' },
  { id: 'safety', label: 'Health & Safety' },
  { id: 'dry-foods', label: 'Dry Foods' },
] as const;

const GALLERY_ITEMS = [
  {
    id: 1,
    category: 'panel-beating',
    title: 'Toyota Hilux Full Body Repair',
    desc: 'Complete panel beating after accident damage. Restored to factory condition.',
    image: GALLERY_IMAGES.panelCloseup,
    featured: true,
  },
  {
    id: 2,
    category: 'spray-painting',
    title: 'Mercedes C-Class Full Respray',
    desc: 'Full body respray in Obsidian Black with ceramic clear coat.',
    image: GALLERY_IMAGES.paintSpray,
  },
  {
    id: 3,
    category: 'mechanical',
    title: 'Engine Overhaul — Nissan Patrol',
    desc: 'Complete engine rebuild including new pistons, rings, and gaskets.',
    image: GALLERY_IMAGES.engineOverhaul,
  },
  {
    id: 4,
    category: 'restoration',
    title: 'Classic Land Cruiser Restoration',
    desc: 'Full restoration of a 1985 Land Cruiser FJ40 to showroom condition.',
    image: GALLERY_IMAGES.landCruiserRestore,
  },
  {
    id: 5,
    category: 'spray-painting',
    title: 'Toyota Corolla Spot Repair',
    desc: 'Precision spot repair and color-matched respray on rear quarter panel.',
    image: GALLERY_IMAGES.corollaSpotRepair,
  },
  {
    id: 6,
    category: 'panel-beating',
    title: 'Isuzu D-Max Dent Removal',
    desc: 'Paintless dent removal on bonnet and door panels.',
    image: GALLERY_IMAGES.dmaxDent,
    wide: true,
  },
  {
    id: 7,
    category: 'mechanical',
    title: 'Gearbox Rebuild — Toyota Prado',
    desc: 'Full automatic gearbox rebuild with new clutch packs and seals.',
    image: GALLERY_IMAGES.gearboxPrado,
  },
  {
    id: 8,
    category: 'restoration',
    title: 'VW Golf GTI Full Restoration',
    desc: 'Mechanical, electrical, and cosmetic restoration of a 2005 Golf GTI.',
    image: GALLERY_IMAGES.golfGti,
  },
  {
    id: 9,
    category: 'spray-painting',
    title: 'Performance Coupe Finish',
    desc: 'Mirror-smooth clear coat and colour correction on a performance coupe.',
    image: GALLERY_IMAGES.mercedesRespray,
    wide: true,
  },
  {
    id: 10,
    category: 'mechanical',
    title: 'Wheel & Brake Assembly',
    desc: 'Precision brake disc and caliper service with full safety inspection.',
    image: GALLERY_IMAGES.wheelBrake,
  },
  {
    id: 11,
    category: 'supplies',
    title: 'Office Stationery Procurement',
    desc: 'Bulk supply of paper, pens, filing, and desktop accessories for a Mombasa corporate client.',
    image: GALLERY_IMAGES.officeStationery,
    wide: true,
  },
  {
    id: 12,
    category: 'supplies',
    title: 'Furniture & Fittings Delivery',
    desc: 'Office desks, chairs, and filing solutions supplied and installed on site.',
    image: GALLERY_IMAGES.officeFurniture,
  },
  {
    id: 13,
    category: 'it-equipment',
    title: 'IT Equipment Setup',
    desc: 'Laptops, printers, UPS, and networking gear supplied for a growing business.',
    image: GALLERY_IMAGES.itSetup,
    featured: true,
  },
  {
    id: 14,
    category: 'safety',
    title: 'Workplace Safety Kit',
    desc: 'Hard hats, first aid kits, and fire safety equipment for a construction site.',
    image: GALLERY_IMAGES.safetyGear,
  },
  {
    id: 15,
    category: 'dry-foods',
    title: 'Dry Foods & Beverages Supply',
    desc: 'Rice, tea, cooking oil, and pantry staples delivered to schools and offices.',
    image: GALLERY_IMAGES.dryFoodsSupply,
    wide: true,
  },
] as const;

type GalleryItem = (typeof GALLERY_ITEMS)[number];

function isFeatured(item: GalleryItem): item is GalleryItem & { featured: true } {
  return 'featured' in item && item.featured === true;
}

function isWide(item: GalleryItem): item is GalleryItem & { wide: true } {
  return 'wide' in item && item.wide === true;
}

interface LightboxItem {
  title: string;
  desc: string;
  image: string;
  category: string;
}

function GalleryCard({
  item,
  index,
  visible,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  visible: boolean;
  onOpen: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const categoryLabel =
    GALLERY_FILTERS.find(f => f.id === item.category)?.label ?? item.category;

  const layoutClass = isFeatured(item)
    ? 'md:col-span-2 md:row-span-2'
    : isWide(item)
      ? 'md:col-span-2'
      : '';

  const aspectClass = isFeatured(item)
    ? 'aspect-[4/5] md:aspect-auto md:min-h-[420px]'
    : isWide(item)
      ? 'aspect-[16/10]'
      : 'aspect-square';

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative overflow-hidden rounded-2xl text-left cursor-pointer reveal ${visible ? 'visible' : ''} ${layoutClass} bg-[#2D2626] shadow-md shadow-[#2D2626]/10 ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A32] focus-visible:ring-offset-2`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className={`relative w-full h-full ${aspectClass}`}>
        <img
          src={imgError ? GALLERY_IMAGES.panelCloseup : item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          onError={() => setImgError(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2626]/90 via-[#2D2626]/25 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-1 rounded-full bg-[#F05A32] text-white text-[10px] font-['Inter'] font-semibold uppercase tracking-wide">
            {categoryLabel}
          </span>
        </div>

        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
          <ZoomIn size={16} className="text-white" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <h3 className="font-['Barlow_Condensed'] font-700 text-white text-lg md:text-xl leading-tight mb-1 group-hover:text-[#F0826E] transition-colors">
            {item.title}
          </h3>
          <p className="text-orange-100/90 text-xs md:text-sm font-['Inter'] line-clamp-2 opacity-90">
            {item.desc}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const filtered =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(i => i.category === activeFilter);

  return (
    <section id="gallery" ref={ref} className="py-20 md:py-28 bg-[#F5F3F2]">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F05A32]/10 text-[#F05A32] text-sm px-4 py-1.5 rounded-full mb-4 font-['Inter'] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32]" />
            Our Work
          </div>
          <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading centered">
            OUR FINEST WORK
          </h2>
          <p className="text-gray-600 font-['Inter'] max-w-xl mx-auto mt-4">
            Workshop craftsmanship plus supplies, IT, safety gear, and dry foods — everything Gwecely delivers across Kenya.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
          {GALLERY_FILTERS.map(f => {
            const count =
              f.id === 'all'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter(i => i.category === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-['Inter'] font-medium transition-all duration-200 ${
                  activeFilter === f.id
                    ? 'bg-[#F05A32] text-white shadow-md shadow-[#F05A32]/25'
                    : 'bg-white text-gray-600 hover:bg-white/80 ring-1 ring-black/5'
                }`}
              >
                {f.label}
                <span className={`ml-1.5 text-xs ${activeFilter === f.id ? 'text-orange-100' : 'text-gray-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-fr">
          {filtered.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={i}
              visible={visible}
              onOpen={() =>
                setLightbox({
                  title: item.title,
                  desc: item.desc,
                  image: item.image,
                  category: item.category,
                })
              }
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 font-['Inter'] py-16">
            No projects in this category yet.
          </p>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          <div
            className="relative max-w-5xl w-full bg-[#2D2626] rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full max-h-[75vh] object-cover"
            />
            <div className="p-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#F0826E] font-['Inter'] font-medium uppercase tracking-wide">
                  {GALLERY_FILTERS.find(f => f.id === lightbox.category)?.label}
                </span>
                <h3 className="font-['Barlow_Condensed'] font-700 text-2xl text-white mt-0.5">
                  {lightbox.title}
                </h3>
                <p className="text-orange-100 text-sm font-['Inter'] mt-2 max-w-2xl">
                  {lightbox.desc}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
