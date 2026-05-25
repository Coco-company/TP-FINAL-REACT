import { useState, useContext, createContext } from 'react';
import { CartContext } from './context.jsx';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (product, quantity) => {
    const itemInCart = cart.find(item => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item );
      setCart(updatedCart);
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity }]);
    }
  };
  const clearCart = () => setCart([]);

  const getCartQuantity = () => { 
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };
  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, getCartQuantity, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};