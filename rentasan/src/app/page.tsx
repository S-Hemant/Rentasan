'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import styles from './page.module.css';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

const ICONS: Record<string, string> = {
  furniture:'🛋️', electronics:'💻', appliances:'🏠', sports:'⚽',
  music:'🎸', cameras:'📷', tools:'🔧', baby:'👶', party:'🎉', outdoor:'🏕️',
};

function HomeContent() {
  const featured = products.filter((_, i) => i % 8 === 0).slice(0, 8);
  const userListings = products.filter(p => p.isUserListed).slice(0, 4);

  return (
    <div className={styles.page}>
      {/* ── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroScene}><HeroScene /></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>🚀 India&apos;s #1 Rental Marketplace</div>
          <h1 className={styles.heroTitle}>
            Rent <span className={styles.grad}>Anything</span><br />
            List <span className={styles.gradGold}>Everything</span>
          </h1>
          <p className={styles.heroSub}>
            From furniture to drones, sports gear to DJ systems — rent for a day, week or month.
            Or earn by listing your own items.
          </p>
          <div className={styles.heroActions}>
            <Link href="/browse" className="btn-primary" id="browse-btn">Browse Products ↗</Link>
            <Link href="/list-product" className="btn-gold" id="list-btn">+ List Yours & Earn</Link>
          </div>
          <div className={styles.stats}>
            <div><span>50K+</span><p>Happy Renters</p></div>
            <div><span>130+</span><p>Products</p></div>
            <div><span>10</span><p>Categories</p></div>
            <div><span>8</span><p>Cities</p></div>
          </div>
        </div>
      </section>

      {/* ── Categories ─── */}
      <section className={styles.section}>
        <div className="container">
          <p className="section-label">Shop by Category</p>
          <h2 className="section-title" style={{marginBottom:'32px'}}>What do you need?</h2>
          <div className={styles.catGrid}>
            {categories.map(cat => (
              <Link href={`/browse?cat=${cat.slug}`} key={cat.slug} className={styles.catCard} id={`cat-${cat.slug}`}>
                <span className={styles.catIcon}>{ICONS[cat.slug] || '📦'}</span>
                <span className={styles.catName}>{cat.name}</span>
                <span className={styles.catCount}>{cat.count} items</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured ─── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className="section-label">Handpicked</p>
              <h2 className="section-title">Featured Rentals</h2>
            </div>
            <Link href="/browse" className="btn-secondary">View All →</Link>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── User Listings CTA ─── */}
      <section className={styles.listCta}>
        <div className="container">
          <div className={styles.listCtaInner}>
            <div>
              <span className="badge badge-gold" style={{marginBottom:'16px',display:'inline-block'}}>✨ New Feature</span>
              <h2 className={styles.ctaTitle}>Have something to rent out?</h2>
              <p className={styles.ctaSub}>List your idle items and earn every week. Furniture, electronics, tools, cameras — anything goes.</p>
              <Link href="/list-product" className="btn-gold" id="cta-list-btn">Start Earning →</Link>
            </div>
            <div className={styles.ctaStats}>
              <div className={styles.ctaStat}><span>₹8,000</span><p>Avg. monthly earnings</p></div>
              <div className={styles.ctaStat}><span>2 mins</span><p>To list a product</p></div>
              <div className={styles.ctaStat}><span>Free</span><p>Listing, always</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── User Listed Products ─── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <p className="section-label">Community</p>
              <h2 className="section-title">Listed by Renters</h2>
            </div>
            <Link href="/browse?listed=user" className="btn-secondary">See All →</Link>
          </div>
          <div className="products-grid">
            {userListings.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── How It Works ─── */}
      <section className={styles.section}>
        <div className="container">
          <p className="section-label" style={{textAlign:'center'}}>Simple Steps</p>
          <h2 className="section-title" style={{textAlign:'center',marginBottom:'48px'}}>How Rentasan works</h2>
          <div className={styles.steps}>
            {[
              {icon:'🔍',title:'Browse & Choose',desc:'Pick from 130+ products across 10 categories.'},
              {icon:'📅',title:'Select Duration',desc:'Rent by day, week, or month — total flexibility.'},
              {icon:'🚚',title:'We Deliver',desc:'Free doorstep delivery and pickup anywhere in your city.'},
              {icon:'💰',title:'List & Earn',desc:'Have idle items? List them and earn passive income.'},
            ].map(s => (
              <div className={styles.step} key={s.title}>
                <span className={styles.stepIcon}>{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <WishlistProvider>
        <HomeContent />
      </WishlistProvider>
    </CartProvider>
  );
}
