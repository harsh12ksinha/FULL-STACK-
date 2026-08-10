const BASE_URL = 'https://dummyjson.com/products';

// Helper to convert USD prices to INR (₹)
export const formatINR = (usdPrice) => {
  return Math.round(usdPrice * 83);
};

// Standardized list of requested categories mapped to API slugs
export const DISPLAY_CATEGORIES = [
  { id: 'smartphones', name: 'Smartphones', apiSlug: 'smartphones', icon: '📱' },
  { id: 'laptops', name: 'Laptops', apiSlug: 'laptops', icon: '💻' },
  { id: 'fragrances', name: 'Fragrances', apiSlug: 'fragrances', icon: '🧪' },
  { id: 'skincare', name: 'Skincare', apiSlug: 'skincare', icon: '✨' },
  { id: 'groceries', name: 'Groceries', apiSlug: 'groceries', icon: '🛒' },
  { id: 'home-decoration', name: 'Home Decoration', apiSlug: 'home-decoration', icon: '🏺' },
  { id: 'furniture', name: 'Furniture', apiSlug: 'furniture', icon: '🪑' },
  { id: 'mens-shirts', name: "Men's Clothing", apiSlug: 'mens-shirts', icon: '👔' },
  { id: 'womens-dresses', name: "Women's Clothing", apiSlug: 'womens-dresses', icon: '👗' },
  { id: 'mens-shoes', name: 'Shoes', apiSlug: 'mens-shoes', icon: '👟' },
  { id: 'mens-watches', name: 'Watches', apiSlug: 'mens-watches', icon: '⌚' },
  { id: 'womens-bags', name: 'Accessories', apiSlug: 'womens-bags', icon: '👜' }
];

// Normalize product item data
export const normalizeProduct = (product) => {
  const priceINR = formatINR(product.price);
  const originalPriceINR = Math.round(priceINR / (1 - (product.discountPercentage || 0) / 100));
  
  return {
    ...product,
    priceINR,
    originalPriceINR,
    inStock: product.stock > 0
  };
};

// Fetch all products (limit 100 for comprehensive catalog)
export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}?limit=100`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.products.map(normalizeProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Product not found');
    const data = await response.json();
    return normalizeProduct(data);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Fetch products by category slug
export const fetchProductsByCategory = async (categorySlug) => {
  try {
    const response = await fetch(`${BASE_URL}/category/${categorySlug}`);
    if (!response.ok) throw new Error('Failed to fetch category products');
    const data = await response.json();
    return data.products.map(normalizeProduct);
  } catch (error) {
    console.error(`Error fetching category ${categorySlug}:`, error);
    throw error;
  }
};

// Search products by query term
export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search products');
    const data = await response.json();
    return data.products.map(normalizeProduct);
  } catch (error) {
    console.error(`Error searching products for "${query}":`, error);
    throw error;
  }
};
