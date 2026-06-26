# Gwecely Limited — Design Brainstorm

## Brand Essence
**Gwecely Limited** — Kenya's trusted automotive and business solutions partner. For vehicle owners and businesses seeking professional service and quality supplies. Different because it combines workshop expertise with a full procurement marketplace under one roof.

**Brand Voice:** Confident, professional, and locally grounded. Headlines speak with authority: "Built for Kenya's Roads." CTAs are direct: "Book Your Service Now" / "Shop Genuine Parts." Microcopy is warm and helpful, never corporate-cold.

---

## Three Approaches

### Approach A — Industrial Precision
Bold industrial aesthetic inspired by Bosch and Toyota. Dark steel tones with electric blue accents. Probability: **0.07**

### Approach B — Kenyan Marketplace Energy ✅ CHOSEN
Vibrant, trustworthy marketplace energy — the warmth of Jumia Kenya meets the professionalism of AutoXpress. Deep navy-blue brand identity with warm cream backgrounds, bold typography, and energetic accent colors. Probability: **0.09**

### Approach C — Minimal Corporate
Clean white-space-heavy corporate look. Probability: **0.04**

---

## Chosen Approach: Kenyan Marketplace Energy

### Design Movement
Contemporary East African digital commerce — bold, trustworthy, energetic. Inspired by Jumia Kenya's marketplace vibrancy and Bosch's engineering credibility.

### Core Principles
1. **Trust through boldness** — Large, confident typography signals expertise and reliability
2. **Warm professionalism** — Navy blue authority softened by warm cream/sand backgrounds
3. **Kenyan context** — Design choices that feel local, not imported from Silicon Valley
4. **Commerce clarity** — Products and services are always one clear step away

### Color Philosophy
- **Primary:** `#185FA5` (deep corporate blue — authority, trust)
- **Secondary:** `#0C447C` (darker navy — depth, headers)
- **Accent:** `#378ADD` (sky blue — CTAs, highlights, links)
- **Success:** `#639922` (Kenyan green — confirmation, badges)
- **Background:** `#F1EFE8` (warm cream — warmth, readability)
- **Dark surfaces:** `#0A1628` (near-black navy for hero, footer)

### Layout Paradigm
Asymmetric hero with diagonal cuts. Product grid with sidebar filters. Full-bleed section alternation between cream and navy. Cards with left-accent borders. Avoid centered-only layouts.

### Signature Elements
1. **Diagonal section dividers** — CSS clip-path cuts between sections for dynamic flow
2. **Blue left-border accent cards** — Service and product cards with a 4px left blue border
3. **Kenya flag green badges** — Trust indicators and "Genuine" badges in #639922

### Interaction Philosophy
Snappy hover states (150ms ease-out). Cart sidebar slides in from right. Booking form with step-by-step validation feedback. Scroll-triggered counter animations.

### Animation
- Hero text: staggered fade-up on load (0ms, 100ms, 200ms delays)
- Cards: scale(0.97→1) + opacity(0→1) on scroll intersection
- Counter: count-up animation when trust section enters viewport
- Nav: background transitions from transparent to solid on scroll (200ms)
- Cart sidebar: slide-in from right (300ms cubic-bezier(0.23,1,0.32,1))

### Typography System
- **Display/Headlines:** `Barlow Condensed` — Bold, industrial, Kenyan-road-sign energy
- **Body:** `Inter` — Clean, readable, professional
- **Accent/Prices:** `Barlow` SemiBold — Confident product pricing

### Wordmark & Logo
Bold "G" lettermark in white on a deep navy circle, with a subtle wrench/gear motif integrated into the counter of the G. Used in header and favicon.

### Signature Brand Color
`#185FA5` — Gwecely Blue. Unmistakably this brand's anchor color.

---

## Style Decisions
- Nav transitions from transparent (over hero) to `bg-[#0C447C]/95 backdrop-blur` on scroll
- Product cards use white background with subtle shadow and blue left-border on hover
- Section backgrounds alternate: cream (#F1EFE8) → white → navy (#0A1628) → cream
- All CTAs use `#185FA5` fill with white text; secondary CTAs use outlined blue
- Testimonials carousel uses dark navy card with white text for contrast
- Gallery uses CSS grid masonry with hover zoom + overlay
- Gwecely's visual voice should balance **70% warm cream/sand marketplace surfaces with 30% deep navy authority**, reserving bright blue for primary actions and Kenya green only for trust, genuine, and confirmation signals.
- The Gwecely wordmark must always include a distinctive **custom "G" lettermark with a wrench/gear cue**, and the logo should appear prominently enough in header and footer to be recognizable without reading body copy.
- Page copy should use locally grounded authority: headlines should reference Kenyan roads, Nairobi/Mombasa service coverage, genuine parts, and practical business supply needs rather than generic corporate web phrases.
