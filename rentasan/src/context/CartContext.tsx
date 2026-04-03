'use client';
import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, Product, RentalDuration } from '@/types';

interface CartState {
  items: CartItem[];
  saved: CartItem[];
}

type Action =
  | { type: 'ADD'; product: Product; duration: number; durationType: RentalDuration }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'SAVE_FOR_LATER'; id: string }
  | { type: 'MOVE_TO_CART'; id: string }
  | { type: 'REMOVE_SAVED'; id: string }
  | { type: 'CLEAR' }
  | { type: 'SET_CART'; state: CartState };

const CartContext = createContext<{
  state: CartState;
  addToCart: (p: Product, d: number, dt: RentalDuration) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  removeSaved: (id: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
} | null>(null);

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'SET_CART':
      return action.state;
    case 'ADD': {
      const exists = state.items.find(i => i.product.id === action.product.id);
      if (exists) return state;
      return { ...state, items: [...state.items, { product: action.product, duration: action.duration, durationType: action.durationType, quantity: 1 }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.product.id !== action.id) };
    case 'UPDATE_QTY':
      return { ...state, items: state.items.map(i => i.product.id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i) };
    case 'SAVE_FOR_LATER': {
      const item = state.items.find(i => i.product.id === action.id);
      if (!item) return state;
      return {
        items: state.items.filter(i => i.product.id !== action.id),
        saved: [...state.saved, item]
      };
    }
    case 'MOVE_TO_CART': {
      const item = state.saved.find(i => i.product.id === action.id);
      if (!item) return state;
      return {
        saved: state.saved.filter(i => i.product.id !== action.id),
        items: [...state.items, item]
      };
    }
    case 'REMOVE_SAVED':
      return { ...state, saved: state.saved.filter(i => i.product.id !== action.id) };
    case 'CLEAR':
      return { items: [], saved: [] };
    default: return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], saved: [] });

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('rentasan_cart');
    if (savedCart) {
      try {
        dispatch({ type: 'SET_CART', state: JSON.parse(savedCart) });
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('rentasan_cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (p: Product, d: number, dt: RentalDuration) => dispatch({ type: 'ADD', product: p, duration: d, durationType: dt });
  const removeFromCart = (id: string) => dispatch({ type: 'REMOVE', id });
  const updateQty = (id: string, qty: number) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const saveForLater = (id: string) => dispatch({ type: 'SAVE_FOR_LATER', id });
  const moveToCart = (id: string) => dispatch({ type: 'MOVE_TO_CART', id });
  const removeSaved = (id: string) => dispatch({ type: 'REMOVE_SAVED', id });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const total = state.items.reduce((sum, i) => {
    const rate = i.durationType === 'daily' ? i.product.price.daily : i.durationType === 'weekly' ? i.product.price.weekly : i.product.price.monthly;
    return sum + rate * i.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      state, addToCart, removeFromCart, updateQty, saveForLater, moveToCart, removeSaved, clearCart, total, itemCount: state.items.length
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
