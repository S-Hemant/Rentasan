'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from '../login/auth.module.css';

export default function Signup() {
  const { signup, loginWithGoogle, isLoading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(form.name, form.email, form.password);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>⬡ Rentasan</div>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.sub}>Join India&apos;s premium rental marketplace</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="name" className="form-input" placeholder="Priya Kumar" value={form.name} onChange={handle} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handle} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-input" placeholder="Min 8 characters" value={form.password} onChange={handle} required minLength={8} />
          </div>
          <button type="submit" className="btn-gold" disabled={isLoading} style={{width:'100%',justifyContent:'center',marginTop:'12px'}}>
            {isLoading ? 'Processing...' : 'Create Account →'}
          </button>
        </form>

        <div className={styles.divider}><span>OR</span></div>

        <button className={styles.socialBtn} onClick={loginWithGoogle} disabled={isLoading}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
          Sign up with Google
        </button>

        <p className={styles.switch}>Already have an account? <Link href="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
