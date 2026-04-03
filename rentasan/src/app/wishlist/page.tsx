'use client';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider, useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import styles from './wishlist.module.css';

function WishlistContent() {
  const { items } = useWishlist();
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.icon}>♡</div>
        <h2>Your wishlist is empty</h2>
        <p>Tap the heart on any product to save it here.</p>
        <a href="/browse" className="btn-primary" id="browse-wishlist-btn">Discover Products</a>
      </div>
    );
  }
  return <div className="products-grid">{items.map(p => <ProductCard key={p.id} product={p} />)}</div>;
}

export default function Wishlist() {
  return (
    <CartProvider><WishlistProvider>
      <div className={styles.page}>
        <div className="container">
          <h1 className={styles.title}>My Wishlist</h1>
          <WishlistContent />
        </div>
      </div>
    </WishlistProvider></CartProvider>
  );
}
