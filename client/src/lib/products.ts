/**
 * Product utilities — catalog loaded from /api/products
 */

export type { Product } from '@shared/product';
export { CATEGORIES, SHOP_CATEGORIES } from '@shared/product';

import type { Product } from '@shared/product';
import { CATEGORIES } from '@shared/product';

export function getProductsByCategory(products: Product[], category: string): Product[] {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
}

export function getShopCategories(products: Product[]) {
  return CATEGORIES.filter(
    (cat) => cat.id === 'all' || products.some((p) => p.category === cat.id)
  );
}

export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  switch (sortBy) {
    case 'price-asc':
      return [...products].sort((a, b) => a.price - b.price);
    case 'price-desc':
      return [...products].sort((a, b) => b.price - a.price);
    case 'rating':
      return [...products].sort((a, b) => b.rating - a.rating);
    case 'newest':
      return [...products].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    default:
      return products;
  }
}

export function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString()}`;
}
