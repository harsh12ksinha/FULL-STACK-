import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ShoppingCart, ArrowRight, Trash2, ShoppingBag, Truck, PartyPopper } from 'lucide-react';

const Cart = () => {
  const {
    cartItems,
    clearCart,
    subtotal,
    gst,
    deliveryCharge,
    grandTotal,
    totalItemCount,
    freeDeliveryThreshold,
    isFreeDelivery,
    amountNeededForFreeDelivery
  } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="main-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'var(--primary-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <ShoppingCart size={48} color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--slate-500)', marginBottom: '2rem', textAlign: 'center', maxWidth: '400px' }}>
          Looks like you haven't added any products yet. Browse our catalog and find something you love!
        </p>
        <Link to="/products" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
          <ShoppingBag size={20} /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Shopping Cart</h1>
          <p style={{ color: 'var(--slate-500)' }}>{totalItemCount} item{totalItemCount !== 1 ? 's' : ''} in your cart</p>
        </div>
        <button onClick={clearCart} className="btn btn-danger btn-sm">
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
        {/* Cart Items List */}
        <div style={{ background: 'white', borderRadius: 'var(--radius)', padding: '1.5rem', border: '1px solid var(--slate-200)' }}>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          <div style={{ paddingTop: '1.25rem' }}>
            <Link to="/products" className="btn btn-outline btn-sm">
              <ShoppingBag size={16} /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ background: 'white', borderRadius: 'var(--radius)', padding: '1.5rem', border: '1px solid var(--slate-200)', position: 'sticky', top: '100px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--slate-100)' }}>Order Summary</h3>

          {/* Delivery Progress */}
          <div className={`delivery-progress-card ${isFreeDelivery ? '' : 'below'}`}>
            {isFreeDelivery ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#047857' }}>
                <PartyPopper size={18} /> 🎉 You got FREE DELIVERY!
              </div>
            ) : (
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)' }}>
                <Truck size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Add ₹{amountNeededForFreeDelivery.toLocaleString('en-IN')} more to get FREE DELIVERY!
              </div>
            )}
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Price Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--slate-600)' }}>
              <span>Subtotal ({totalItemCount} items)</span>
              <span style={{ fontWeight: '700', color: 'var(--dark)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--slate-600)' }}>
              <span>GST (18%)</span>
              <span style={{ fontWeight: '700', color: 'var(--dark)' }}>₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--slate-600)' }}>
              <span>Delivery Charge</span>
              {isFreeDelivery ? (
                <span style={{ fontWeight: '700', color: 'var(--success)' }}>FREE</span>
              ) : (
                <span style={{ fontWeight: '700', color: 'var(--dark)' }}>₹{deliveryCharge.toLocaleString('en-IN')}</span>
              )}
            </div>
          </div>

          <div style={{ borderTop: '2px solid var(--slate-200)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>Grand Total</span>
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>

          <button onClick={() => navigate('/checkout')} className="btn btn-primary btn-full" style={{ padding: '0.9rem', fontSize: '1.05rem' }}>
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--slate-400)' }}>
            🔒 Secure checkout powered by ShopX
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
