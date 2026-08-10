import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllProducts, DISPLAY_CATEGORIES } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchQueryParam = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sorting state: 'default', 'price-low-high', 'price-high-low', 'rating'
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState(500000); // max price INR filter

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch product catalog. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Filter & Sort Logic
  useEffect(() => {
    let result = [...products];

    // 1. Category Filter
    if (categoryParam && categoryParam !== 'all') {
      result = result.filter(item => 
        item.category.toLowerCase() === categoryParam.toLowerCase() ||
        categoryParam.toLowerCase().includes(item.category.toLowerCase()) ||
        item.category.toLowerCase().includes(categoryParam.toLowerCase())
      );
    }

    // 2. Search Query Filter
    if (searchQueryParam) {
      const q = searchQueryParam.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.brand && item.brand.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
      );
    }

    // 3. Price Filter
    result = result.filter(item => item.priceINR <= priceRange);

    // 4. Sorting
    if (sortBy === 'price-low-high') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [products, categoryParam, searchQueryParam, sortBy, priceRange]);

  const handleCategorySelect = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setSortBy('default');
    setPriceRange(500000);
  };

  return (
    <div className="main-container">
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Product Catalog</h1>
        <p style={{ color: 'var(--slate-500)' }}>
          Explore our complete collection of dynamic electronics, fashion, beauty, and home goods.
        </p>

        {/* Active Search / Filter Badges */}
        {(categoryParam !== 'all' || searchQueryParam) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--slate-600)', fontWeight: '600' }}>Active Filters:</span>
            {categoryParam !== 'all' && (
              <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textTransform: 'capitalize' }}>
                Category: {categoryParam}
                <X size={14} style={{ cursor: 'pointer' }} onClick={() => handleCategorySelect('all')} />
              </span>
            )}
            {searchQueryParam && (
              <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Search: "{searchQueryParam}"
                <X size={14} style={{ cursor: 'pointer' }} onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('search');
                  setSearchParams(newParams);
                }} />
              </span>
            )}
            <button onClick={handleResetFilters} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
              Clear All
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
        {/* Left Sidebar Filter Controls */}
        <aside style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--slate-200)', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.75rem' }}>
            <Filter size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem' }}>Filter Products</h3>
          </div>

          {/* Categories Filter */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--slate-700)' }}>Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <button
                onClick={() => handleCategorySelect('all')}
                style={{
                  textAlign: 'left',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: categoryParam === 'all' ? 'var(--primary-light)' : 'transparent',
                  color: categoryParam === 'all' ? 'var(--primary)' : 'var(--slate-700)',
                  fontWeight: categoryParam === 'all' ? '700' : '500',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'var(--transition)'
                }}
              >
                📦 All Categories ({products.length})
              </button>

              {DISPLAY_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.apiSlug)}
                  style={{
                    textAlign: 'left',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: categoryParam === cat.apiSlug ? 'var(--primary-light)' : 'transparent',
                    color: categoryParam === cat.apiSlug ? 'var(--primary)' : 'var(--slate-700)',
                    fontWeight: categoryParam === cat.apiSlug ? '700' : '500',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'var(--transition)'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Filter Slider */}
          <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--slate-100)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--slate-700)' }}>Max Price</h4>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)' }}>
                ₹{priceRange.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
          </div>
        </aside>

        {/* Right Main Catalog Content */}
        <div>
          {/* Top Sort Bar */}
          <div style={{
            background: 'white',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--slate-200)',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--slate-600)', fontWeight: '600' }}>
              Showing <strong>{filteredProducts.length}</strong> products
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ArrowUpDown size={16} color="var(--slate-500)" />
              <span style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.45rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--slate-300)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  fontWeight: '600',
                  color: 'var(--slate-800)',
                  backgroundColor: '#f8fafc',
                  cursor: 'pointer'
                }}
              >
                <option value="default">Popularity / Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Customer Rating (Highest)</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
