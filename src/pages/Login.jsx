import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // If already logged in, redirect
  if (user) {
    return (
      <div className="main-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>You're already logged in as {user.name}!</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Go to Homepage</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate login — check if user is registered in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('shopx_registered_users') || '[]');
    const foundUser = registeredUsers.find(u => u.email === form.email);

    if (foundUser) {
      if (foundUser.password !== form.password) {
        setError('Invalid password. Please try again.');
        return;
      }
      login({ name: foundUser.name, email: foundUser.email });
    } else {
      // Auto-login with email name
      const name = form.email.split('@')[0].replace(/[^a-zA-Z ]/g, ' ');
      login({ name: name.charAt(0).toUpperCase() + name.slice(1), email: form.email });
    }
    navigate('/');
  };

  return (
    <div className="main-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem',
        width: '100%',
        maxWidth: '440px',
        border: '1px solid var(--slate-200)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <LogIn size={28} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>Sign in to your ShopX account</p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--slate-700)' }}>
              <Mail size={15} /> Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1.5px solid var(--slate-200)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                outline: 'none',
                backgroundColor: 'var(--slate-50)',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--slate-700)' }}>
              <Lock size={15} /> Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.5rem 0.75rem 1rem',
                  border: '1.5px solid var(--slate-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  backgroundColor: 'var(--slate-50)',
                  fontFamily: 'inherit'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--slate-400)',
                  display: 'flex'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{ padding: '0.8rem', marginTop: '0.5rem', fontSize: '1rem' }}>
            Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '700' }}>Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
