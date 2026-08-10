import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopx_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to parse cart from localstorage', e);
      return [];
    }
  });

  // Save to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('shopx_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localstorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.priceINR * item.quantity), 0);
  const gst = Math.round(subtotal * 0.18);
  const freeDeliveryThreshold = 2000;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryCharge = (subtotal === 0 || isFreeDelivery) ? 0 : 100;
  const grandTotal = subtotal + gst + deliveryCharge;
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      gst,
      deliveryCharge,
      grandTotal,
      totalItemCount,
      freeDeliveryThreshold,
      isFreeDelivery,
      amountNeededForFreeDelivery
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
