import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, Percent, Headset } from 'lucide-react';
import { DISPLAY_CATEGORIES } from '../services/api';

const Footer = () => {
  return (
    <footer className="footer-dark">
      {/* Features Bar */}
      <div style={{ background: 'var(--slate-800)', borderBottom: '1px solid var(--slate-700)', padding: '1.5rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white' }}>
            <Truck size={28} color="#10b981" />
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Free Delivery</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>On all orders above ₹2000</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white' }}>
            <Percent size={28} color="#f59e0b" />
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>18% GST Compliant</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>Official tax invoice provided</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white' }}>
            <ShieldCheck size={28} color="#6366f1" />
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Secure Shopping</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>100% genuine products</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white' }}>
            <Headset size={28} color="#06b6d4" />
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>24/7 Customer Support</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>Instant assistance via email & chat</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-container">
        <div className="footer-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <ShoppingBag size={26} color="#818cf8" />
            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>ShopX</span>
          </div>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.6' }}>
            ShopX is India's modern e-commerce destination providing high quality products across electronics, fashion, groceries, and home decor with fast shipping and automated GST invoicing.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ background: 'var(--slate-800)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--slate-300)' }}>💳 UPI Accepted</span>
            <span style={{ background: 'var(--slate-800)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--slate-300)' }}>🚚 Fast Express</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/login">User Login</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Top Categories</h4>
          <ul className="footer-links">
            {DISPLAY_CATEGORIES.slice(0, 5).map(cat => (
              <li key={cat.id}>
                <Link to={`/products?category=${cat.apiSlug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Subscribe to get special offers, free giveaways, and price drop alerts.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to ShopX newsletter!'); }} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="email"
              placeholder="Your email address..."
              required
              style={{
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--slate-700)',
                background: 'var(--slate-800)',
                color: 'white',
                fontSize: '0.85rem',
                flex: 1,
                outline: 'none'
              }}
            />
            <button type="submit" className="btn btn-primary btn-sm">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopX E-Commerce Platform. All Rights Reserved. Crafted with React & Tailwind aesthetics for India.</p>
      </div>
    </footer>
  );
};

export default Footer;
