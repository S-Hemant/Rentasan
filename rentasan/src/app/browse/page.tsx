'use client';
import { useState, useMemo } from 'react';
import { categories, products } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import styles from './browse.module.css';

const ICONS: Record<string, string> = {
  furniture:'🛋️', electronics:'💻', appliances:'🏠', sports:'⚽',
  music:'🎸', cameras:'📷', tools:'🔧', baby:'👶', party:'🎉', outdoor:'🏕️',
};

function BrowseContent() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState<'price-asc'|'price-desc'|'rating'|'default'>('default');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [userOnly, setUserOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }
    if (cat !== 'all') list = list.filter(p => p.subcategory === cat);
    if (userOnly) list = list.filter(p => p.isUserListed);
    list = list.filter(p => p.price.monthly <= maxPrice);
    
    if (sort === 'price-asc') list.sort((a,b) => a.price.monthly - b.price.monthly);
    else if (sort === 'price-desc') list.sort((a,b) => b.price.monthly - a.price.monthly);
    else if (sort === 'rating') list.sort((a,b) => b.rating - a.rating);
    
    return list;
  }, [search, cat, sort, maxPrice, userOnly]);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Browse Rentals</h1>
            <p className={styles.sub}>{filtered.length} products available</p>
          </div>
          <div className={styles.searchWrap}>
            <input className={styles.search} placeholder="🔍  Search products…" value={search} onChange={e => setSearch(e.target.value)} id="search-input" />
          </div>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.filterGroup}>
              <h4>Category</h4>
              <button className={`${styles.catBtn} ${cat==='all'?styles.active:''}`} onClick={() => setCat('all')}>All Products</button>
              {categories.map(c => (
                <button key={c.slug} className={`${styles.catBtn} ${cat===c.slug?styles.active:''}`} onClick={() => setCat(c.slug)} id={`filter-${c.slug}`}>
                  {ICONS[c.slug]} {c.name} <span>{c.count}</span>
                </button>
              ))}
            </div>
            <div className={styles.filterGroup}>
              <h4>Max Monthly Price</h4>
              <input type="range" min={100} max={5000} step={100} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className={styles.range} />
              <p className={styles.priceLabel}>Up to ₹{maxPrice}/mo</p>
            </div>
            <div className={styles.filterGroup}>
              <h4>Sort By</h4>
              {([['default','Recommended'],['price-asc','Price: Low to High'],['price-desc','Price: High to Low'],['rating','Best Rated']] as const).map(([v,l]) => (
                <button key={v} className={`${styles.catBtn} ${sort===v?styles.active:''}`} onClick={() => setSort(v)}>{l}</button>
              ))}
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.toggle}>
                <input type="checkbox" checked={userOnly} onChange={e => setUserOnly(e.target.checked)} />
                <span>User Listed Only</span>
              </label>
            </div>
          </aside>

          {/* Grid */}
          <div className={styles.main}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>😕 No products match your filters.</div>
            ) : (
              <div className="products-grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Browse() {
  return (
    <CartProvider><WishlistProvider><BrowseContent /></WishlistProvider></CartProvider>
  );
}
