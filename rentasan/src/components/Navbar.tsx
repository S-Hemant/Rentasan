'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, logout, isLoading } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
          <span>Renta<span className={styles.logoAccent}>san</span></span>
        </Link>
        <div className={styles.links}>
          <Link href="/browse">Browse</Link>
          <Link href="/list-product" className={styles.listLink}>+ List Product</Link>
          <Link href="/wishlist">Wishlist</Link>
          {user && <Link href="/dashboard">Dashboard</Link>}
        </div>
        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartBtn}>
            🛒 {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </Link>
          
          {!isLoading && (
            user ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>{user.name.split(' ')[0]}</span>
                <button onClick={logout} className={styles.logoutBtn}>Logout</button>
              </div>
            ) : (
              <Link href="/login" className={styles.loginBtn}>Login</Link>
            )
          )}
        </div>
        <button className={styles.hamburger} onClick={() => setOpen(o => !o)} aria-label="menu">☰</button>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          <Link href="/browse" onClick={() => setOpen(false)}>Browse</Link>
          <Link href="/list-product" onClick={() => setOpen(false)}>+ List Product</Link>
          <Link href="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
          {user && <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>}
          <Link href="/cart" onClick={() => setOpen(false)}>Cart ({itemCount})</Link>
          {user ? (
            <button onClick={() => { logout(); setOpen(false); }} className={styles.mobileLogout}>Logout</button>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
