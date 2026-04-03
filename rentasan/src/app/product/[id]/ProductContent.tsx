'use client';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { RentalDuration } from '@/types';
import styles from './product.module.css';
import ProductCard from '@/components/ProductCard';

const ProductScene = dynamic(() => import('@/components/three/ProductScene'), { ssr: false });

export default function ProductContent({ id }: { id: string }) {
  const product = products.find(p => p.id === id);
  if (!product) return notFound();

  const { addToCart, state } = useCart();
  const { toggle, has } = useWishlist();
  const [duration, setDuration] = useState<RentalDuration>('monthly');
  const [days, setDays] = useState(30);
  const inCart = state.items.some(i => i.product.id === product.id);
  const wished = has(product.id);
  const stars = Math.round(product.rating);

  const price = duration === 'daily' ? product.price.daily * days
    : duration === 'weekly' ? product.price.weekly * Math.ceil(days / 7)
    : product.price.monthly;

  const related = products.filter(p => p.subcategory === product.subcategory && p.id !== product.id).slice(0, 4);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          {/* 3D Scene / Image */}
          <div className={styles.sceneWrap}>
            <ProductScene color={product.subcategory === 'electronics' ? '#7C3AED' : product.subcategory === 'furniture' ? '#F59E0B' : '#9D5FF3'} />
            <img src={product.image} alt={product.name} className={styles.productImg} />
          </div>

          {/* Details */}
          <div className={styles.details}>
            {product.isUserListed && (
              <span className="badge badge-gold" style={{marginBottom:'12px',display:'inline-block'}}>👤 Listed by {product.listedBy}</span>
            )}
            <p className={styles.cat}>{product.category}</p>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.meta}>
              <span className={styles.stars}>{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
              <span className={styles.ratingNum}>{product.rating}</span>
              <span className={styles.reviews}>({product.reviewCount} reviews)</span>
              <span className={styles.location}>📍 {product.location}</span>
            </div>
            <p className={styles.desc}>{product.description}</p>

            {/* Duration picker */}
            <div className={styles.durationPicker}>
              <p className={styles.label}>Rental Duration</p>
              <div className={styles.durationBtns}>
                {(['daily','weekly','monthly'] as RentalDuration[]).map(d => (
                  <button key={d} onClick={() => { setDuration(d); setDays(d==='daily'?1:d==='weekly'?7:30); }}
                    className={`${styles.dBtn} ${duration===d?styles.dActive:''}`}
                    id={`duration-${d}`}>
                    {d.charAt(0).toUpperCase()+d.slice(1)}
                    <span>₹{d==='daily'?product.price.daily:d==='weekly'?product.price.weekly:product.price.monthly}</span>
                  </button>
                ))}
              </div>
              {duration !== 'monthly' && (
                <input type="number" min={1} max={duration==='daily'?30:12}
                  value={days} onChange={e => setDays(Number(e.target.value))}
                  className={`${styles.daysInput} form-input`}
                  placeholder={duration==='daily'?'Days':'Weeks'} />
              )}
            </div>

            {/* Pricing summary */}
            <div className={styles.priceSummary}>
              <div className={styles.priceRow}>
                <span>Rental</span><span className={styles.priceVal}>₹{price}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Security Deposit</span><span className={styles.priceVal}>₹{product.deposit}</span>
              </div>
              <div className={`${styles.priceRow} ${styles.total}`}>
                <span>Total to Pay</span><span className={styles.priceVal}>₹{price + product.deposit}</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={`btn-primary ${inCart?'':'pulse'}`} style={{flex:1}}
                onClick={() => addToCart(product, days, duration)} disabled={inCart} id="add-to-cart-btn">
                {inCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>
              <button className={styles.wishBtnLg} onClick={() => toggle(product)} id="wishlist-btn">
                {wished ? '♥' : '♡'}
              </button>
            </div>

            <div className={styles.features}>
              <p className={styles.label}>Included</p>
              <div className={styles.featureList}>
                {product.features.map(f => <span key={f} className={styles.feat}>✓ {f}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className={styles.related}>
            <h2 className="section-title" style={{marginBottom:'24px'}}>You might also like</h2>
            <div className="products-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
