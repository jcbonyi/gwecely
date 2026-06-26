/**
 * WishlistContext — Gwecely Limited
 * Global wishlist state with localStorage persistence
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  isOpen: boolean;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleItem: (item: WishlistItem) => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'gwecely_wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: WishlistItem) => {
    setItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const isWishlisted = (id: string) => items.some(i => i.id === id);

  const toggleItem = (item: WishlistItem) => {
    if (isWishlisted(item.id)) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        isWishlisted,
        toggleItem,
        openWishlist: () => setIsOpen(true),
        closeWishlist: () => setIsOpen(false),
        toggleWishlist: () => setIsOpen((prev) => !prev),
        count: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
