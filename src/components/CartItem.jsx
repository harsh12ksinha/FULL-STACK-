import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const itemTotal = item.priceINR * item.quantity;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '80px 1fr auto auto',
      gap: '1.25rem',
      alignItems: 'center',
      padding: '1.25rem 0',
      borderBottom: '1px solid var(--slate-200)'
    }}>
      {/* Product Image */}
      <Link to={`/products/${item.id}`} style={{ width: '80px', height: '80px', background: '#f8fafc', borderRadius: 'var(--radius-sm)', padding: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={item.thumbnail || item.images?.[0]}
          alt={item.title}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </Link>

      {/* Product Details */}
      <div>
        <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: '600' }}>
          {item.brand || item.category}
        </span>
        <Link to={`/products/${item.id}`} style={{ display: 'block' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--dark)', margin: '0.2rem 0 0.4rem' }}>
            {item.title}
          </h4>
        </Link>
        <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
          Unit Price: <strong style={{ color: 'var(--dark)' }}>₹{item.priceINR.toLocaleString('en-IN')}</strong>
        </div>
      </div>

      {/* Quantity Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--slate-100)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}>
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.3rem 0.5rem', minWidth: '28px', height: '28px' }}
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span style={{ fontWeight: '700', minWidth: '24px', textAlign: 'center', fontSize: '0.95rem' }}>
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.3rem 0.5rem', minWidth: '28px', height: '28px' }}
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Item Subtotal & Delete Action */}
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--dark)' }}>
          ₹{itemTotal.toLocaleString('en-IN')}
        </span>
        <button
          onClick={() => removeFromCart(item.id)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--slate-400)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.8rem',
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--slate-400)'}
        >
          <Trash2 size={16} /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
