/**
 * Hospitality Supplies — product categories, featured items, and page content
 */

export const HOSPITALITY_SEO = {
  title: 'Hospitality Supplies Kenya | Hotel & Restaurant Equipment — Gwecely Ltd',
  description:
    'Gwecely Ltd supplies hotels, restaurants, resorts, caterers, schools, and institutions across Kenya with tableware, glassware, kitchen equipment, housekeeping supplies, and catering essentials. Request a wholesale quotation today.',
  keywords:
    'Hospitality Supplies Kenya, Hotel Supplies Kenya, Restaurant Equipment Kenya, Catering Equipment Kenya, Commercial Kitchen Equipment Kenya, Hospitality Procurement Kenya, Hotel Tableware Kenya, Hospitality Products Kenya, Glassware Suppliers Kenya, Hotel Equipment Suppliers Kenya',
};

export const HOSPITALITY_QUOTE_KEY = 'gwecely-hospitality-quote';

export const HOSPITALITY_CATEGORIES = [
  {
    id: 'tableware',
    title: 'Tableware & Dining Essentials',
    icon: 'utensils',
    imageKey: 'tableware' as const,
    products: [
      'Dinner Plates',
      'Side Plates',
      'Dessert Plates',
      'Soup Bowls',
      'Serving Bowls',
      'Platters',
      'Serving Dishes',
      'Coffee Cups & Saucers',
      'Tea Sets',
    ],
  },
  {
    id: 'glassware',
    title: 'Glassware',
    icon: 'wine',
    imageKey: 'glassware' as const,
    products: [
      'Water Glasses',
      'Wine Glasses',
      'Champagne Flutes',
      'Cocktail Glasses',
      'Beer Mugs',
      'Juice Glasses',
      'Tumblers',
    ],
  },
  {
    id: 'cutlery',
    title: 'Cutlery & Serving Accessories',
    icon: 'fork-knife',
    imageKey: 'cutlery' as const,
    products: [
      'Forks',
      'Knives',
      'Spoons',
      'Dessert Cutlery',
      'Serving Spoons',
      'Serving Tongs',
      'Buffet Accessories',
    ],
  },
  {
    id: 'kitchen',
    title: 'Commercial Kitchen Equipment',
    icon: 'chef-hat',
    imageKey: 'kitchen' as const,
    products: [
      'Chafing Dishes',
      'Food Warmers',
      'Commercial Cookware',
      'Stainless Steel Equipment',
      'Food Preparation Equipment',
      'Storage Containers',
      'Serving Trolleys',
    ],
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping Supplies',
    icon: 'sparkles',
    imageKey: 'housekeeping' as const,
    products: [
      'Cleaning Chemicals',
      'Trolleys',
      'Waste Bins',
      'Tissue Products',
      'Laundry Supplies',
      'Guest Room Amenities',
    ],
  },
  {
    id: 'catering',
    title: 'Catering & Event Supplies',
    icon: 'party',
    imageKey: 'catering' as const,
    products: [
      'Buffet Sets',
      'Serving Trays',
      'Beverage Dispensers',
      'Event Dining Sets',
      'Catering Equipment',
    ],
  },
] as const;

export const HOSPITALITY_BENEFITS = [
  'Quality Guaranteed Products',
  'Competitive Wholesale Pricing',
  'Bulk Supply Capacity',
  'Fast Nationwide Delivery',
  'Reliable Procurement Support',
  'Trusted by Hospitality Businesses',
  'Custom Orders Available',
  'Excellent Customer Service',
] as const;

export const HOSPITALITY_INDUSTRIES = [
  'Hotels',
  'Restaurants',
  'Cafés',
  'Resorts',
  'Lodges',
  'Catering Companies',
  'Schools',
  'Universities',
  'Hospitals',
  'NGOs',
  'Government Institutions',
  'Corporate Offices',
] as const;

export const HOSPITALITY_PROCUREMENT_SERVICES = [
  'Bulk Orders',
  'Project-Based Procurement',
  'Hotel Setup Supplies',
  'Restaurant Equipment Supply',
  'Institutional Procurement',
  'Custom Sourcing',
] as const;

export const HOSPITALITY_FEATURED = [
  {
    id: 'porcelain-plates',
    name: 'Premium Porcelain Dinner Plates',
    description: 'Elegant, durable porcelain dinner plates for hotels and fine-dining restaurants.',
    category: 'Tableware & Dining Essentials',
    imageKey: 'featuredPlates' as const,
  },
  {
    id: 'cutlery-sets',
    name: 'Stainless Steel Cutlery Sets',
    description: 'Commercial-grade cutlery sets — forks, knives, and spoons for high-volume service.',
    category: 'Cutlery & Serving Accessories',
    imageKey: 'featuredCutlery' as const,
  },
  {
    id: 'wine-glasses',
    name: 'Luxury Wine Glasses',
    description: 'Crystal-clear wine glasses for upscale dining rooms, bars, and event venues.',
    category: 'Glassware',
    imageKey: 'featuredGlassware' as const,
  },
  {
    id: 'chafing-dishes',
    name: 'Commercial Chafing Dishes',
    description: 'Stainless steel chafing dishes for buffets, banquets, and catering operations.',
    category: 'Commercial Kitchen Equipment',
    imageKey: 'featuredChafing' as const,
  },
  {
    id: 'buffet-sets',
    name: 'Buffet Serving Sets',
    description: 'Complete buffet serving sets with trays, lids, and fuel holders for events.',
    category: 'Catering & Event Supplies',
    imageKey: 'featuredBuffet' as const,
  },
  {
    id: 'housekeeping-trolley',
    name: 'Hotel Housekeeping Trolleys',
    description: 'Heavy-duty housekeeping trolleys for hotels, lodges, and institutional facilities.',
    category: 'Housekeeping Supplies',
    imageKey: 'featuredTrolley' as const,
  },
] as const;

export const HOSPITALITY_TESTIMONIALS = [
  {
    name: 'Daniel Kariuki',
    role: 'Hotel Manager',
    organization: 'Coastal Resort, Mombasa',
    rating: 5,
    review:
      'Gwecely supplied our entire dining room setup — tableware, glassware, and chafing dishes. Quality was excellent and delivery was on schedule for our reopening.',
    avatarKey: 'daniel' as const,
  },
  {
    name: 'Amina Hassan',
    role: 'Restaurant Owner',
    organization: 'Swahili Kitchen, Nairobi',
    rating: 5,
    review:
      'We source cutlery, glassware, and kitchen equipment through Gwecely. Competitive wholesale pricing and they understand what a busy restaurant needs.',
    avatarKey: 'amina' as const,
  },
  {
    name: 'Robert Ochieng',
    role: 'Catering Director',
    organization: 'Events & Banquets Ltd',
    rating: 5,
    review:
      'Bulk buffet sets and beverage dispensers for our events — Gwecely handles large orders reliably. Their procurement team is responsive and professional.',
    avatarKey: 'robert' as const,
  },
  {
    name: 'Faith Wanjiku',
    role: 'Procurement Officer',
    organization: 'Private School, Kisumu',
    rating: 5,
    review:
      'Institutional dining supplies for our school cafeteria — from serving trays to cleaning chemicals. Gwecely delivered a complete package at a fair price.',
    avatarKey: 'faith' as const,
  },
] as const;

export const QUOTE_CATEGORIES = HOSPITALITY_CATEGORIES.map((c) => c.title);
