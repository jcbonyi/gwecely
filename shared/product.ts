export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  updatedAt?: string;
  updatedBy?: string;
}

export interface ProductInput {
  id?: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  rating?: number;
  reviews?: number;
  image: string;
  badge?: string | null;
  description: string;
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'spare-parts', label: 'Spare Parts' },
  { id: 'batteries', label: 'Batteries' },
  { id: 'tyres', label: 'Tyres' },
  { id: 'engine-oils', label: 'Engine Oils' },
  { id: 'filters', label: 'Filters' },
  { id: 'office-stationery', label: 'Office Stationery' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'it-equipment', label: 'IT Equipment' },
  { id: 'safety-equipment', label: 'Health & Safety' },
  { id: 'dry-foods', label: 'Dry Foods & Beverages' },
] as const;

export const SHOP_CATEGORIES = CATEGORIES.filter((c) => c.id !== 'all');
