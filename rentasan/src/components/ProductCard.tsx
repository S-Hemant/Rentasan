'use client';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, state } = useCart();
  const { toggle, has } = useWishlist();
  const inCart = state.items.some(i => i.product.id === product.id);
  const wished = has(product.id);
  const stars = Math.round(product.rating);

  return (
    <div className={styles.card}>
      <Link href={`/product/${product.id}`} className={styles.imgWrap}>
        <img src={product.image} alt={product.name} className={styles.img} loading="lazy" />
        <div className={styles.overlay} />
        {product.isUserListed && <span className={styles.userBadge}>👤 User Listed</span>}
        <button
          className={`${styles.wishBtn} ${wished ? styles.wishedBtn : ''}`}
          onClick={e => { e.preventDefault(); toggle(product); }}
          aria-label="wishlist"
        >
          {wished ? '♥' : '♡'}
        </button>
      </Link>
      <div className={styles.body}>
        <p className={styles.cat}>{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <div className={styles.meta}>
          <span className={styles.stars}>
            {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
          </span>
          <span className={styles.reviews}>({product.reviewCount})</span>
          <span className={styles.location}>📍 {product.location}</span>
        </div>
        <div className={styles.pricing}>
          <span className={styles.price}>₹{product.price.monthly}<span>/mo</span></span>
          <span className={styles.dayPrice}>₹{product.price.daily}/day</span>
        </div>
        <button
          className={`${styles.rentBtn} ${inCart ? styles.rentedBtn : ''}`}
          onClick={() => addToCart(product, 30, 'monthly')}
          disabled={inCart}
        >
          {inCart ? '✓ In Cart' : 'Rent Now'}
        </button>
      </div>
    </div>
  );
}
