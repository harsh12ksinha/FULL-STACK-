import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Zap, TrendingUp, Flame } from 'lucide-react';
import { fetchAllProducts, DISPLAY_CATEGORIES } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const products = await fetchAllProducts();
        // Top rated for featured
        const sortedByRating = [...products].sort((a, b) => b.rating - a.rating);
        setFeaturedProducts(sortedByRating.slice(0, 8));

        // High discount for best sellers
        const sortedByDiscount = [...products].sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        setBestSellers(sortedByDiscount.slice(0, 8));
      } catch (err) {
        setError('Failed to load store catalog. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="main-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badges">
            <span className="hero-tag"><Sparkles size={14} inline="true" /> India's Premier Online Store</span>
            <span className="hero-tag"><Truck size={14} inline="true" /> Free Delivery over ₹2000</span>
          </div>
          <h1>Discover Premium Products at Unbeatable Prices</h1>
          <p>Explore smartphones, high-performance laptops, luxury fragrances, fresh groceries, and modern home furnishings with 18% GST invoices.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1.05rem' }}>
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/products?category=smartphones" className="btn btn-secondary" style={{ padding: '0.85rem 1.5rem', fontSize: '1.05rem' }}>
              Explore Phones
            </Link>
          </div>
        </div>
        <div className="hero-img-container">
          <img
            src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png"
            alt="Hero Product"
          />
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section style={{ margin: '3rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem' }}>Popular Categories</h2>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem' }}>Browse top categories tailored for your everyday needs</p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>
        <div className="categories-grid">
          {DISPLAY_CATEGORIES.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ margin: '3.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <TrendingUp color="var(--primary)" size={24} />
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>Handpicked Selection</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Featured Products</h2>
        <p style={{ color: 'var(--slate-500)', marginBottom: '1.5rem' }}>Top rated electronics, skincare, and lifestyle essentials</p>
        
        <ProductGrid products={featuredProducts} loading={loading} error={error} />
      </section>

      {/* Promotional Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem 2rem',
        color: 'white',
        margin: '4rem 0',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        <div>
          <span style={{ background: '#f59e0b', color: 'black', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '800' }}>
            SPECIAL OFFER
          </span>
          <h2 style={{ color: 'white', fontSize: '2.2rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
            Get Up to 40% OFF on Top Laptops & Tech
          </h2>
          <p style={{ color: 'var(--slate-300)', maxWidth: '600px', fontSize: '1.05rem' }}>
            Upgrade your workstation today. Calculate tax easily with automated 18% GST breakdown on checkout.
          </p>
        </div>
        <Link to="/products?category=laptops" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
          Explore Laptops <Zap size={18} />
        </Link>
      </section>

      {/* Best Sellers Section */}
      <section style={{ margin: '3.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <Flame color="#ef4444" size={24} />
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ef4444', textTransform: 'uppercase' }}>Hot Deals</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Best-Selling Products</h2>
        <p style={{ color: 'var(--slate-500)', marginBottom: '1.5rem' }}>Highest discount items available for immediate shipping</p>
        
        <ProductGrid products={bestSellers} loading={loading} error={error} />
      </section>
    </div>
  );
};

export default Home;
