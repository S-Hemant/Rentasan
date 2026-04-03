'use client';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import dynamic from 'next/dynamic';

const GlobalCanvas = dynamic(() => import('@/components/three/GlobalCanvas'), { ssr: false });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <GlobalCanvas />
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
