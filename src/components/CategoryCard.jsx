import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products?category=${category.apiSlug}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <div className="category-icon">
        {category.icon}
      </div>
      <span className="category-name">{category.name}</span>
    </div>
  );
};

export default CategoryCard;
