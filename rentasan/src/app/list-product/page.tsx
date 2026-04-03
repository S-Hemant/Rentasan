'use client';
import { useState } from 'react';
import { categories } from '@/data/products';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import styles from './list.module.css';

function ListContent() {
  const [form, setForm] = useState({
    name: '', category: '', description: '',
    dailyPrice: '', weeklyPrice: '', monthlyPrice: '',
    deposit: '', location: '', features: '', minDuration: '1',
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>🎉</div>
        <h2>Product Listed Successfully!</h2>
        <p>Your product <strong>{form.name}</strong> is now live on Rentasan. You&apos;ll start receiving rental requests soon.</p>
        <div className={styles.successActions}>
          <a href="/browse" className="btn-primary" id="view-listing-btn">View on Browse</a>
          <button className="btn-secondary" onClick={() => setSubmitted(false)}>List Another</button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} id="list-product-form">
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📦 Product Details</h3>
        <div className={styles.grid2}>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input name="name" className="form-input" placeholder="e.g. Sony A7 IV Camera" value={form.name} onChange={handle} required id="product-name" />
          </div>
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select name="category" className="form-input" value={form.category} onChange={handle} required id="product-category" style={{background:'#0F1629'}}>
              <option value="">Select a category</option>
              {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea name="description" className="form-input" rows={4} placeholder="Describe your product — condition, included accessories, special notes…" value={form.description} onChange={handle} required id="product-description" style={{resize:'vertical'}} />
        </div>
        <div className="form-group">
          <label className="form-label">Key Features (comma-separated)</label>
          <input name="features" className="form-input" placeholder="e.g. Well maintained, Includes bag, Recent service" value={form.features} onChange={handle} id="product-features" />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>💰 Pricing</h3>
        <div className={styles.grid3}>
          <div className="form-group">
            <label className="form-label">Daily Price (₹) *</label>
            <input name="dailyPrice" type="number" className="form-input" placeholder="e.g. 250" value={form.dailyPrice} onChange={handle} required min={1} id="daily-price" />
          </div>
          <div className="form-group">
            <label className="form-label">Weekly Price (₹)</label>
            <input name="weeklyPrice" type="number" className="form-input" placeholder="e.g. 1200" value={form.weeklyPrice} onChange={handle} min={1} id="weekly-price" />
          </div>
          <div className="form-group">
            <label className="form-label">Monthly Price (₹)</label>
            <input name="monthlyPrice" type="number" className="form-input" placeholder="e.g. 4000" value={form.monthlyPrice} onChange={handle} min={1} id="monthly-price" />
          </div>
        </div>
        <div className={styles.grid2}>
          <div className="form-group">
            <label className="form-label">Security Deposit (₹) *</label>
            <input name="deposit" type="number" className="form-input" placeholder="e.g. 1000" value={form.deposit} onChange={handle} required min={0} id="deposit" />
          </div>
          <div className="form-group">
            <label className="form-label">Minimum Duration (days)</label>
            <input name="minDuration" type="number" className="form-input" placeholder="1" value={form.minDuration} onChange={handle} min={1} id="min-duration" />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📍 Location & Delivery</h3>
        <div className="form-group">
          <label className="form-label">City / Area *</label>
          <input name="location" className="form-input" placeholder="e.g. Bengaluru, HSR Layout" value={form.location} onChange={handle} required id="location" />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📸 Photos</h3>
        <div className={styles.uploadZone}>
          <span className={styles.uploadIcon}>📷</span>
          <p>Drag & drop photos here or <span className={styles.uploadLink}>browse</span></p>
          <p className={styles.uploadHint}>Supports JPG, PNG, WEBP · Max 10MB each · Up to 8 photos</p>
        </div>
      </div>

      <div className={styles.submitRow}>
        <div className={styles.terms}>
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to the <a href="#">Listing Guidelines</a> and <a href="#">Terms of Service</a></label>
        </div>
        <button type="submit" className="btn-gold" id="submit-listing-btn">🚀 List My Product</button>
      </div>
    </form>
  );
}

export default function ListProduct() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="badge badge-gold" style={{marginBottom:'12px',display:'inline-block'}}>✨ Earn Money</span>
            <h1 className={styles.title}>List Your Product</h1>
            <p className={styles.sub}>Turn your idle belongings into a steady income. It&apos;s free to list and takes just 2 minutes.</p>
          </div>
          <div className={styles.perks}>
            <div className={styles.perk}><span>🆓</span><p>Free to list</p></div>
            <div className={styles.perk}><span>💸</span><p>You set the price</p></div>
            <div className={styles.perk}><span>🛡️</span><p>Insured items</p></div>
          </div>
        </div>
        <ListContent />
      </div>
    </div>
  );
}
