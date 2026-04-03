'use client';
import Link from 'next/link';
import { CartProvider, useCart } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import styles from './cart.module.css';

function CartContent() {
  const { state, removeFromCart, clearCart, total, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Browse products and add them to start renting!</p>
        <Link href="/browse" className="btn-primary" id="go-browse">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.items}>
        {state.items.map(item => (
          <div key={item.product.id} className={styles.item}>
            <img src={item.product.image} alt={item.product.name} className={styles.img} />
            <div className={styles.info}>
              <p className={styles.itemCat}>{item.product.category}</p>
              <h3 className={styles.itemName}>{item.product.name}</h3>
              <p className={styles.itemLoc}>📍 {item.product.location}</p>
              <div className={styles.itemMeta}>
                <span className={styles.dur}>{item.durationType} rental</span>
                <span className={styles.dep}>Deposit: ₹{item.product.deposit}</span>
              </div>
            </div>
            <div className={styles.itemRight}>
              <p className={styles.itemPrice}>₹{item.durationType === 'daily' ? item.product.price.daily : item.durationType === 'weekly' ? item.product.price.weekly : item.product.price.monthly}</p>
              <button className={styles.removeBtn} onClick={() => removeFromCart(item.product.id)}>✕ Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.summary}>
        <h3 className={styles.summTitle}>Order Summary</h3>
        <div className={styles.summRow}><span>Rental Subtotal</span><span>₹{total}</span></div>
        <div className={styles.summRow}><span>Delivery</span><span className={styles.free}>Free</span></div>
        <div className={styles.summRow}><span>Security Deposits</span><span>₹{state.items.reduce((s,i) => s + i.product.deposit, 0)}</span></div>
        <div className={`${styles.summRow} ${styles.summTotal}`}>
          <span>Total</span>
          <span>₹{total + state.items.reduce((s,i) => s + i.product.deposit, 0)}</span>
        </div>
        <button className="btn-primary" style={{width:'100%',marginBottom:'12px',justifyContent:'center'}} id="checkout-btn">Proceed to Checkout</button>
        <button className={styles.clearBtn} onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}

export default function Cart() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className={styles.page}>
          <div className="container">
            <h1 className={styles.title}>My Cart</h1>
            <CartContent />
          </div>
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
