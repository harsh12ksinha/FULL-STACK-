import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home, ShoppingBag } from 'lucide-react';

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem('shopx_last_order');
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    } catch (e) {
      console.error('Failed to parse order data', e);
    }
  }, []);

  if (!order) {
    return (
      <div className="main-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>No recent order found</h2>
        <p style={{ color: 'var(--slate-500)', marginBottom: '1.5rem' }}>You haven't placed any orders yet.</p>
        <Link to="/products" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="main-container" style={{ display: 'flex', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '680px' }}>
        {/* Success Banner */}
        <div style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          border: '1px solid #a7f3d0',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            animation: 'float 3s ease-in-out infinite'
          }}>
            <CheckCircle size={44} color="white" />
          </div>
          <h1 style={{ fontSize: '2rem', color: '#047857', marginBottom: '0.5rem' }}>
            🎉 Order Placed Successfully!
          </h1>
          <p style={{ color: '#065f46', fontSize: '1.05rem', maxWidth: '420px', margin: '0 auto' }}>
            Thank you for shopping with ShopX. Your order is being processed and will be shipped soon.
          </p>
        </div>

        {/* Order ID Card */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius)',
          padding: '1.5rem',
          border: '1px solid var(--slate-200)',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', fontWeight: '600', marginBottom: '0.3rem' }}>Order ID</div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.04em' }}>{order.orderId}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', fontWeight: '600', marginBottom: '0.3rem' }}>Order Date</div>
            <div style={{ fontSize: '1rem', fontWeight: '700' }}>{order.date}</div>
          </div>
          <div>
            <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.35rem 0.8rem' }}>
              <Package size={14} style={{ marginRight: '4px' }} /> Processing
            </span>
          </div>
        </div>

        {/* Shipping Details */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius)',
          padding: '1.5rem',
          border: '1px solid var(--slate-200)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--slate-100)' }}>
            Shipping Address
          </h3>
          <div style={{ color: 'var(--slate-700)', lineHeight: '1.7', fontSize: '0.95rem' }}>
            <div style={{ fontWeight: '700' }}>{order.customer.fullName}</div>
            <div>{order.customer.address}</div>
            <div>{order.customer.city}, {order.customer.state} — {order.customer.pinCode}</div>
            <div>📞 {order.customer.phone}</div>
            <div>📧 {order.customer.email}</div>
          </div>
        </div>

        {/* Order Items */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius)',
          padding: '1.5rem',
          border: '1px solid var(--slate-200)',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--slate-100)' }}>
            Items Ordered ({order.items.length})
          </h3>
          {order.items.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0', borderBottom: '1px solid var(--slate-50)' }}>
              <img src={item.thumbnail} alt={item.title} style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px', background: '#f8fafc', padding: '4px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Qty: {item.quantity} × ₹{item.priceINR.toLocaleString('en-IN')}</div>
              </div>
              <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>₹{(item.priceINR * item.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}

          {/* Totals */}
          <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '1rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: '700' }}>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
              <span>GST (18%)</span>
              <span style={{ fontWeight: '700' }}>₹{order.gst.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
              <span>Delivery</span>
              <span style={{ fontWeight: '700', color: order.deliveryCharge === 0 ? 'var(--success)' : 'var(--dark)' }}>
                {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--slate-200)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>Grand Total</span>
              <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>₹{order.grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem' }}>
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/products" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
