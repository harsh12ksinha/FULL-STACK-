import React from 'react';
import ProductCard from './ProductCard';
import { PackageSearch } from 'lucide-react';

const ProductGrid = ({ products, loading, error, onResetFilters }) => {
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p style={{ color: 'var(--slate-600)', fontWeight: '600' }}>Fetching products from ShopX store...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#fee2e2', borderRadius: 'var(--radius)', color: '#b91c1c' }}>
        <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Retry
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 1.5rem',
        background: 'white',
        borderRadius: 'var(--radius)',
        border: '1px dashed var(--slate-300)',
        margin: '1.5rem 0'
      }}>
        <PackageSearch size={54} color="var(--slate-400)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--dark)' }}>No products found</h3>
        <p style={{ color: 'var(--slate-500)', marginBottom: '1.5rem' }}>
          We couldn't find any products matching your selected search query or category filters.
        </p>
        {onResetFilters && (
          <button onClick={onResetFilters} className="btn btn-outline">
            Clear Filters & View All Products
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
