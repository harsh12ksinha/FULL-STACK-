import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

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

    if (!form.name.trim()) { setError('Please enter your full name.'); return; }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) { setError('Please enter a valid email address.'); return; }
    if (!form.password || form.password.length < 4) { setError('Password must be at least 4 characters.'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }

    // Save to localStorage registered users list
    const registeredUsers = JSON.parse(localStorage.getItem('shopx_registered_users') || '[]');
    if (registeredUsers.find(u => u.email === form.email)) {
      setError('An account with this email already exists. Please login.');
      return;
    }

    registeredUsers.push({ name: form.name.trim(), email: form.email, password: form.password });
    localStorage.setItem('shopx_registered_users', JSON.stringify(registeredUsers));

    register({ name: form.name.trim(), email: form.email });
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
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <UserPlus size={28} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>Create Account</h2>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>Join ShopX and start shopping today</p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--slate-700)' }}>
              <User size={15} /> Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ravi Sharma"
              style={{
                width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--slate-200)',
                borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', outline: 'none',
                backgroundColor: 'var(--slate-50)', fontFamily: 'inherit'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--slate-700)' }}>
              <Mail size={15} /> Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="ravi@example.com"
              style={{
                width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--slate-200)',
                borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', outline: 'none',
                backgroundColor: 'var(--slate-50)', fontFamily: 'inherit'
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
                placeholder="Choose a password"
                style={{
                  width: '100%', padding: '0.75rem 2.5rem 0.75rem 1rem', border: '1.5px solid var(--slate-200)',
                  borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', outline: 'none',
                  backgroundColor: 'var(--slate-50)', fontFamily: 'inherit'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', display: 'flex'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--slate-700)' }}>
              <Lock size={15} /> Confirm Password
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Re-enter your password"
              style={{
                width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--slate-200)',
                borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', outline: 'none',
                backgroundColor: 'var(--slate-50)', fontFamily: 'inherit'
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{ padding: '0.8rem', marginTop: '0.5rem', fontSize: '1rem' }}>
            Create Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
