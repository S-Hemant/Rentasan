import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>⬡ Rentasan</div>
          <p>Rent anything. List everything.<br/>India&apos;s premium rental marketplace.</p>
          <div className={styles.tagline}>🇮🇳 Made in India</div>
        </div>
        <div className={styles.col}>
          <h4>Explore</h4>
          <Link href="/browse">All Products</Link>
          <Link href="/browse?cat=electronics">Electronics</Link>
          <Link href="/browse?cat=furniture">Furniture</Link>
          <Link href="/browse?cat=sports">Sports Gear</Link>
          <Link href="/browse?cat=cameras">Cameras</Link>
        </div>
        <div className={styles.col}>
          <h4>Rent with Us</h4>
          <Link href="/list-product">List Your Product</Link>
          <Link href="/dashboard">My Dashboard</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/cart">Cart</Link>
        </div>
        <div className={styles.col}>
          <h4>Company</h4>
          <Link href="#">About Us</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Careers</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Privacy Policy</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2025 Rentasan. All rights reserved.</p>
        <p className={styles.sub}>India&apos;s most flexible rental marketplace</p>
      </div>
    </footer>
  );
}
