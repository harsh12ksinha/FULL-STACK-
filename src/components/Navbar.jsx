import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, LogOut, ChevronDown, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { DISPLAY_CATEGORIES } from '../services/api';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { totalItemCount } = useCart();
  const { user, logout } = useAuth();
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="navbar-sticky">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo-brand">
          <ShoppingBag size={28} color="#4f46e5" />
          <span>Shop<strong style={{ color: '#06b6d4' }}>X</strong></span>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Nav Links */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Products
          </NavLink>

          {/* Categories Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowCategoryMenu(true)}
            onMouseLeave={() => setShowCategoryMenu(false)}
          >
            <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', font: 'inherit' }}>
              Categories <ChevronDown size={16} />
            </button>

            {showCategoryMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                backgroundColor: 'white',
                minWidth: '220px',
                boxShadow: 'var(--shadow-lg)',
                borderRadius: 'var(--radius)',
                padding: '0.5rem',
                zIndex: 1000,
                border: '1px solid var(--slate-200)'
              }}>
                {DISPLAY_CATEGORIES.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.apiSlug}`}
                    onClick={() => setShowCategoryMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      color: 'var(--slate-700)',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-light)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon with Counter Badge */}
          <Link to="/cart" className="nav-link" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={22} />
            <span style={{ marginLeft: '4px' }}>Cart</span>
            {totalItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-10px',
                backgroundColor: 'var(--danger)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: '800',
                borderRadius: '9999px',
                padding: '2px 6px',
                lineHeight: 1,
                boxShadow: 'var(--shadow-sm)'
              }}>
                {totalItemCount}
              </span>
            )}
          </Link>

          {/* User Auth */}
          {user ? (
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowUserMenu(true)}
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <button className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
                <User size={16} />
                <span>{user.name || 'Account'}</span>
                <ChevronDown size={14} />
              </button>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  backgroundColor: 'white',
                  minWidth: '180px',
                  boxShadow: 'var(--shadow-lg)',
                  borderRadius: 'var(--radius)',
                  padding: '0.5rem',
                  zIndex: 1000,
                  border: '1px solid var(--slate-200)'
                }}>
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--slate-100)', marginBottom: '0.4rem' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{user.email}</div>
                  </div>
                  <button
                    onClick={logout}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      color: 'var(--danger)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
