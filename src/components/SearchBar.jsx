import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = ({ initialQuery = '', placeholder = "Search smartphones, laptops, fashion..." }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-container" style={{ position: 'relative', width: '100%', maxWidth: '450px' }}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '0.6rem 2.5rem 0.6rem 1rem',
          borderRadius: '9999px',
          border: '1.5px solid var(--slate-300)',
          fontSize: '0.9rem',
          outline: 'none',
          transition: 'all 0.2s',
          backgroundColor: '#f8fafc'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--slate-300)'}
      />
      <button
        type="submit"
        aria-label="Search"
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--slate-500)',
          display: 'flex',
          alignItems: 'center',
          padding: '4px'
        }}
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
