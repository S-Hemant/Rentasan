'use client';
import Link from 'next/link';
import { CartProvider, useCart } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import styles from './cart.module.css';

function CartContent() {
  const { state, removeFromCart, updateQty, saveForLater, moveToCart, removeSaved, clearCart, total, itemCount } = useCart();

  if (itemCount === 0 && state.saved.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Browse products and add them to start renting!</p>
        <Link href="/browse" className="btn-primary" id="go-browse">Browse Products</Link>
      </div>
    );
  }

  const securityDeposit = state.items.reduce((s, i) => s + i.product.deposit * i.quantity, 0);
  const grandTotal = total + securityDeposit;

  return (
    <div className={styles.layout}>
      <div className={styles.itemsColumn}>
        {itemCount > 0 ? (
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
                  <div className={styles.actions}>
                    <button className={styles.actionLink} onClick={() => saveForLater(item.product.id)}>Save for Later</button>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.product.id)}>Remove</button>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <p className={styles.itemPrice}>₹{item.durationType === 'daily' ? item.product.price.daily : item.durationType === 'weekly' ? item.product.price.weekly : item.product.price.monthly}</p>
                  <div className={styles.qtyBox}>
                    <button className={styles.qtyBtn} onClick={() => updateQty(item.product.id, item.quantity - 1)}>−</button>
                    <span className={styles.qtyVal}>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => updateQty(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyMsg}>Your active cart is empty.</div>
        )}

        {state.saved.length > 0 && (
          <div className={styles.savedSection}>
            <h2 className={styles.sectionTitle}>Saved for Later ({state.saved.length})</h2>
            <div className={styles.items}>
              {state.saved.map(item => (
                <div key={item.product.id} className={`${styles.item} ${styles.savedItem}`}>
                  <img src={item.product.image} alt={item.product.name} className={styles.img} />
                  <div className={styles.info}>
                    <p className={styles.itemCat}>{item.product.category}</p>
                    <h3 className={styles.itemName}>{item.product.name}</h3>
                    <div className={styles.actions}>
                      <button className={styles.actionLink} onClick={() => moveToCart(item.product.id)}>Move to Cart</button>
                      <button className={styles.removeBtn} onClick={() => removeSaved(item.product.id)}>Remove</button>
                    </div>
                  </div>
                  <div className={styles.itemRight}>
                    <p className={styles.itemPrice}>₹{item.durationType === 'daily' ? item.product.price.daily : item.durationType === 'weekly' ? item.product.price.weekly : item.product.price.monthly}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.summary}>
        <h3 className={styles.summTitle}>Order Summary</h3>
        <div className={styles.summRow}><span>Rental Subtotal ({itemCount} items)</span><span>₹{total}</span></div>
        <div className={styles.summRow}><span>Delivery</span><span className={styles.free}>Free</span></div>
        <div className={styles.summRow}><span>Security Deposits</span><span>₹{securityDeposit}</span></div>
        <div className={`${styles.summRow} ${styles.summTotal}`}>
          <span>Total Payable</span>
          <span>₹{grandTotal}</span>
        </div>
        <p className={styles.summNote}>* Fully refundable security deposit</p>
        <button className="btn-primary" style={{width:'100%',marginBottom:'12px',marginTop:'18px',justifyContent:'center'}} id="checkout-btn">Proceed to Checkout</button>
        {itemCount > 0 && <button className={styles.clearBtn} onClick={clearCart}>Clear Cart</button>}
      </div>
    </div>
  );
}

export default function Cart() {
  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>My Cart</h1>
        <CartContent />
      </div>
    </div>
  );
}
