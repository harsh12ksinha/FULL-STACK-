import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    navigate('/cart');
  };

  return (
    <div className="product-card">
      {/* Discount Tag */}
      {product.discountPercentage > 0 && (
        <span className="card-discount-badge">
          {Math.round(product.discountPercentage)}% OFF
        </span>
      )}

      {/* Image Container */}
      <Link to={`/products/${product.id}`} className="card-img-wrapper">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="card-img"
          loading="lazy"
        />
      </Link>

      {/* Body Content */}
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
          <span className="card-category">{product.category}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: '600' }}>
            {product.brand || 'ShopX'}
          </span>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="card-title" title={product.title}>{product.title}</h3>
        </Link>

        {/* Rating */}
        <div className="card-rating">
          <Star size={15} fill="var(--accent)" color="var(--accent)" />
          <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{product.rating?.toFixed(1) || '4.5'}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>({product.stock * 3 + 12} reviews)</span>
        </div>

        {/* Stock Status */}
        <div style={{ margin: '0.25rem 0 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          {product.inStock ? (
            <span style={{ color: 'var(--success)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <CheckCircle2 size={13} /> In Stock ({product.stock} left)
            </span>
          ) : (
            <span style={{ color: 'var(--danger)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <AlertCircle size={13} /> Out of Stock
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="card-price-row">
          <span className="current-price">₹{product.priceINR.toLocaleString('en-IN')}</span>
          {product.originalPriceINR > product.priceINR && (
            <span className="original-price">₹{product.originalPriceINR.toLocaleString('en-IN')}</span>
          )}
        </div>

        {/* Card Actions */}
        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.5rem 0.4rem', fontSize: '0.8rem' }}
          >
            <ShoppingCart size={15} /> Add
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="btn btn-primary btn-sm"
            style={{ padding: '0.5rem 0.4rem', fontSize: '0.8rem' }}
          >
            <Zap size={15} /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
