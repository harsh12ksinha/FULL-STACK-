import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Zap, ChevronLeft, Plus, Minus, CheckCircle2, AlertCircle, Truck, ShieldCheck, RotateCcw, Package } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found or failed to load. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="main-container">
        <div className="spinner-container">
          <div className="spinner"></div>
          <p style={{ color: 'var(--slate-600)', fontWeight: '600' }}>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="main-container">
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h2 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>😔 {error || 'Product not found'}</h2>
          <Link to="/products" className="btn btn-primary">Browse All Products</Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="main-container">
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--slate-500)' }}>
        <Link to="/" style={{ color: 'var(--slate-500)' }}>Home</Link>
        <span>/</span>
        <Link to="/products" style={{ color: 'var(--slate-500)' }}>Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} style={{ color: 'var(--slate-500)', textTransform: 'capitalize' }}>{product.category}</Link>
        <span>/</span>
        <span style={{ color: 'var(--dark)', fontWeight: '600' }}>{product.title}</span>
      </nav>

      <button onClick={() => navigate(-1)} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>
        <ChevronLeft size={18} /> Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
        {/* Left: Product Images */}
        <div>
          {/* Main Image */}
          <div style={{
            background: '#f8fafc',
            borderRadius: 'var(--radius)',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            marginBottom: '1rem',
            border: '1px solid var(--slate-200)'
          }}>
            <img
              src={images[selectedImage]}
              alt={product.title}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'all 0.3s ease' }}
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedImage === index ? '2px solid var(--primary)' : '1px solid var(--slate-200)',
                    background: '#f8fafc',
                    padding: '0.35rem',
                    cursor: 'pointer',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition)'
                  }}
                >
                  <img src={img} alt={`${product.title} view ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div>
          {/* Brand & Category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>{product.category}</span>
            {product.brand && (
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--slate-500)' }}>by {product.brand}</span>
            )}
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem', lineHeight: '1.25' }}>{product.title}</h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={18} fill={star <= Math.round(product.rating) ? 'var(--accent)' : 'none'} color="var(--accent)" />
              ))}
            </div>
            <span style={{ fontWeight: '700', fontSize: '1rem' }}>{product.rating?.toFixed(1)}</span>
            <span style={{ color: 'var(--slate-500)', fontSize: '0.85rem' }}>({product.stock * 3 + 12} ratings)</span>
          </div>

          {/* Price Block */}
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius)', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark)' }}>
                ₹{product.priceINR.toLocaleString('en-IN')}
              </span>
              {product.originalPriceINR > product.priceINR && (
                <span style={{ fontSize: '1.1rem', color: 'var(--slate-400)', textDecoration: 'line-through' }}>
                  ₹{product.originalPriceINR.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span style={{ color: '#047857', fontWeight: '700', fontSize: '0.95rem' }}>
                🎉 {Math.round(product.discountPercentage)}% OFF — You save ₹{(product.originalPriceINR - product.priceINR).toLocaleString('en-IN')}!
              </span>
            )}
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '0.3rem' }}>Inclusive of 18% GST</div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Product Description</h3>
            <p style={{ color: 'var(--slate-600)', lineHeight: '1.7', fontSize: '0.95rem' }}>{product.description}</p>
          </div>

          {/* Stock Status */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {product.inStock ? (
              <>
                <CheckCircle2 size={20} color="var(--success)" />
                <span style={{ color: 'var(--success)', fontWeight: '700' }}>In Stock — {product.stock} units available</span>
              </>
            ) : (
              <>
                <AlertCircle size={20} color="var(--danger)" />
                <span style={{ color: 'var(--danger)', fontWeight: '700' }}>Currently Out of Stock</span>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: '700', fontSize: '0.95rem', display: 'block', marginBottom: '0.5rem' }}>Quantity</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--slate-100)', padding: '0.3rem', borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.4rem 0.6rem' }}
              >
                <Minus size={16} />
              </button>
              <span style={{ fontWeight: '800', fontSize: '1.1rem', minWidth: '32px', textAlign: 'center' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.4rem 0.6rem' }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={handleAddToCart} disabled={!product.inStock} className="btn btn-outline" style={{ padding: '0.85rem' }}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button onClick={handleBuyNow} disabled={!product.inStock} className="btn btn-primary" style={{ padding: '0.85rem' }}>
              <Zap size={20} /> Buy Now
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { icon: <Truck size={18} />, text: 'Free Delivery over ₹2000' },
              { icon: <ShieldCheck size={18} />, text: '100% Genuine Products' },
              { icon: <RotateCcw size={18} />, text: '7-Day Easy Returns' },
              { icon: <Package size={18} />, text: 'Secure Packaging' }
            ].map((badge, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                <span style={{ color: 'var(--primary)' }}>{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
