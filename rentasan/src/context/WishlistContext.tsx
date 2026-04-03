'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types';

interface WishlistCtx {
  items: Product[];
  toggle: (p: Product) => void;
  has: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const toggle = (p: Product) =>
    setItems(prev => prev.find(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p]);
  const has = (id: string) => items.some(i => i.id === id);
  return (
    <WishlistContext.Provider value={{ items, toggle, has }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
