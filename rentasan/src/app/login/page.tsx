'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './auth.module.css';

export default function Login() {
  const { login, loginWithGoogle, loginWithPhone, isLoading } = useAuth();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [form, setForm] = useState({ email: '', password: '', phone: '' });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'email') await login(form.email, form.password);
    else await loginWithPhone(form.phone);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>⬡ Rentasan</div>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.sub}>Luxury rentals at your fingertips</p>
        
        <div className={styles.authTabs}>
          <button className={`${styles.authTab} ${method==='email'?styles.activeAuthTab:''}`} onClick={()=>setMethod('email')}>Email</button>
          <button className={`${styles.authTab} ${method==='phone'?styles.activeAuthTab:''}`} onClick={()=>setMethod('phone')}>Phone</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {method === 'email' ? (
            <>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input name="email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handle} required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input name="password" type="password" className="form-input" placeholder="••••••••" value={form.password} onChange={handle} required />
              </div>
            </>
          ) : (
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input name="phone" type="tel" className="form-input" placeholder="+91 99999 99999" value={form.phone} onChange={handle} required />
            </div>
          )}
          
          <button type="submit" className="btn-primary" disabled={isLoading} style={{width:'100%',justifyContent:'center',marginTop:'12px'}}>
            {isLoading ? 'Processing...' : 'Continue →'}
          </button>
        </form>

        <div className={styles.divider}><span>OR</span></div>

        <button className={styles.socialBtn} onClick={loginWithGoogle} disabled={isLoading}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
          Continue with Google
        </button>

        <p className={styles.switch}>New to Rentasan? <Link href="/signup">Create account</Link></p>
      </div>
    </div>
  );
}
