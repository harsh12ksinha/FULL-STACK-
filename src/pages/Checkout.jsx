import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, CreditCard, ShieldCheck, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const {
    cartItems,
    subtotal,
    gst,
    deliveryCharge,
    grandTotal,
    totalItemCount,
    isFreeDelivery,
    clearCart
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error for that field
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.phone.trim() || form.phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.pinCode.trim() || form.pinCode.length < 6) newErrors.pinCode = 'Valid 6-digit PIN code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate random order ID
    const orderId = 'SX-' + Math.floor(100000 + Math.random() * 900000);

    // Save order to localStorage for confirmation page
    const orderData = {
      orderId,
      items: cartItems,
      subtotal,
      gst,
      deliveryCharge,
      grandTotal,
      customer: form,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    localStorage.setItem('shopx_last_order', JSON.stringify(orderData));

    // Clear the cart
    clearCart();

    // Navigate to order success page
    navigate('/order-success');
  };

  if (cartItems.length === 0) {
    return (
      <div className="main-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ marginBottom: '0.75rem' }}>No items to checkout</h2>
        <p style={{ color: 'var(--slate-500)', marginBottom: '1.5rem' }}>Your cart is empty. Add some products first.</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '0.7rem 0.9rem',
    border: errors[fieldName] ? '1.5px solid var(--danger)' : '1.5px solid var(--slate-200)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'var(--transition)',
    fontFamily: 'inherit',
    backgroundColor: 'var(--slate-50)'
  });

  return (
    <div className="main-container">
      <button onClick={() => navigate('/cart')} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Back to Cart
      </button>

      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Checkout</h1>
      <p style={{ color: 'var(--slate-500)', marginBottom: '2rem' }}>Complete your purchase and enjoy your new products</p>

      <form onSubmit={handlePlaceOrder}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem', alignItems: 'start' }}>
          {/* Left: Customer Details Form */}
          <div style={{ background: 'white', borderRadius: 'var(--radius)', padding: '2rem', border: '1px solid var(--slate-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <MapPin size={22} color="var(--primary)" />
              <h2 style={{ fontSize: '1.25rem' }}>Shipping Details</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--slate-700)' }}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Ravi Sharma"
                  style={inputStyle('fullName')}
                />
                {errors.fullName && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.fullName}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--slate-700)' }}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ravi@example.com"
                  style={inputStyle('email')}
                />
                {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.email}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--slate-700)' }}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength="10"
                  style={inputStyle('phone')}
                />
                {errors.phone && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.phone}</span>}
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--slate-700)' }}>Street Address *</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House No. 42, Sector 21, Main Road..."
                  rows="2"
                  style={{ ...inputStyle('address'), resize: 'vertical' }}
                />
                {errors.address && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.address}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--slate-700)' }}>City *</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  style={inputStyle('city')}
                />
                {errors.city && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.city}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--slate-700)' }}>State *</label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  style={inputStyle('state')}
                />
                {errors.state && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.state}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--slate-700)' }}>PIN Code *</label>
                <input
                  type="text"
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  placeholder="400001"
                  maxLength="6"
                  style={inputStyle('pinCode')}
                />
                {errors.pinCode && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.pinCode}</span>}
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div style={{ background: 'white', borderRadius: 'var(--radius)', padding: '1.5rem', border: '1px solid var(--slate-200)', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--slate-100)' }}>
              Order Summary
            </h3>

            {/* Items Summary */}
            <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '1rem' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid var(--slate-50)' }}>
                  <img src={item.thumbnail} alt={item.title} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px', background: '#f8fafc', padding: '3px' }} />
                  <div style={{ flex: 1, fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: '600', lineHeight: '1.3' }}>{item.title}</div>
                    <span style={{ color: 'var(--slate-500)' }}>Qty: {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>₹{(item.priceINR * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid var(--slate-100)', paddingTop: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
                <span>Subtotal ({totalItemCount} items)</span>
                <span style={{ fontWeight: '700', color: 'var(--dark)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
                <span>GST (18%)</span>
                <span style={{ fontWeight: '700', color: 'var(--dark)' }}>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
                <span>Delivery</span>
                {isFreeDelivery ? (
                  <span style={{ fontWeight: '700', color: 'var(--success)' }}>FREE</span>
                ) : (
                  <span style={{ fontWeight: '700', color: 'var(--dark)' }}>₹{deliveryCharge}</span>
                )}
              </div>
            </div>

            <div style={{ borderTop: '2px solid var(--slate-200)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>Final Amount</span>
              <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <button type="submit" className="btn btn-primary btn-full" style={{ padding: '0.9rem', fontSize: '1.05rem' }}>
              <CreditCard size={20} /> Place Order — ₹{grandTotal.toLocaleString('en-IN')}
            </button>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--slate-400)' }}>
              <ShieldCheck size={14} /> Encrypted & Secure Payment
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
