'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import styles from './dashboard.module.css';

const MOCK_USER = { name: 'Priya K.', email: 'priya@example.com', joinDate: 'Jan 2025' };
const myListings = products.filter(p => p.isUserListed).slice(0, 3);
const myRentals = products.slice(10, 13);

function DashboardContent() {
  const [tab, setTab] = useState<'rentals'|'listings'|'earnings'>('rentals');
  return (
    <div className={styles.page}>
      <div className="container">
        {/* Profile card */}
        <div className={styles.profile}>
          <div className={styles.avatar}>{MOCK_USER.name[0]}</div>
          <div>
            <h1 className={styles.name}>{MOCK_USER.name}</h1>
            <p className={styles.email}>{MOCK_USER.email}</p>
            <p className={styles.joined}>Member since {MOCK_USER.joinDate}</p>
          </div>
          <Link href="/list-product" className="btn-gold" style={{marginLeft:'auto'}} id="dash-list-btn">+ List Product</Link>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {[{label:'Active Rentals', val:'3'},{label:'My Listings', val:'3'},{label:'Total Earned', val:'₹24,500'},{label:'Rating', val:'4.9 ★'}].map(s => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statVal}>{s.val}</span>
              <p className={styles.statLabel}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {(['rentals','listings','earnings'] as const).map(t => (
            <button key={t} className={`${styles.tab} ${tab===t?styles.tabActive:''}`} onClick={() => setTab(t)} id={`tab-${t}`}>
              {t === 'rentals' ? '📦 My Rentals' : t === 'listings' ? '🏷️ My Listings' : '💰 Earnings'}
            </button>
          ))}
        </div>

        {tab === 'rentals' && (
          <div>
            <p className={styles.tabSub}>Products you are currently renting</p>
            <div className="products-grid">{myRentals.map(p => <ProductCard key={p.id} product={p} />)}</div>
          </div>
        )}
        {tab === 'listings' && (
          <div>
            <p className={styles.tabSub}>Products you have listed for rent</p>
            <div className="products-grid">{myListings.map(p => <ProductCard key={p.id} product={p} />)}</div>
          </div>
        )}
        {tab === 'earnings' && (
          <div className={styles.earnings}>
            <div className={styles.earningCard}><span className={styles.eAmount}>₹8,200</span><p>April 2025</p></div>
            <div className={styles.earningCard}><span className={styles.eAmount}>₹9,100</span><p>March 2025</p></div>
            <div className={styles.earningCard}><span className={styles.eAmount}>₹7,200</span><p>February 2025</p></div>
            <div className={`${styles.earningCard} ${styles.total}`}><span className={styles.eAmount}>₹24,500</span><p>Total Earned</p></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return <CartProvider><WishlistProvider><DashboardContent /></WishlistProvider></CartProvider>;
}
