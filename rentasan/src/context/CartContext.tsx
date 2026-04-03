'use client';
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product, RentalDuration } from '@/types';

interface CartState { items: CartItem[]; }
type Action =
  | { type: 'ADD'; product: Product; duration: number; durationType: RentalDuration }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' };

const CartContext = createContext<{
  state: CartState;
  addToCart: (p: Product, d: number, dt: RentalDuration) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
} | null>(null);

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.product.id === action.product.id);
      if (exists) return state;
      return { items: [...state.items, { product: action.product, duration: action.duration, durationType: action.durationType, quantity: 1 }] };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.product.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    default: return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const addToCart = (p: Product, d: number, dt: RentalDuration) => dispatch({ type: 'ADD', product: p, duration: d, durationType: dt });
  const removeFromCart = (id: string) => dispatch({ type: 'REMOVE', id });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const total = state.items.reduce((sum, i) => {
    const rate = i.durationType === 'daily' ? i.product.price.daily : i.durationType === 'weekly' ? i.product.price.weekly : i.product.price.monthly;
    return sum + rate * i.quantity;
  }, 0);
  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart, total, itemCount: state.items.length }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
