import { useState } from 'react';
import { CartContext } from './context.jsx';

// PARTE QUE FIGURA ACÁ EN EL CUADERNILLO UBICADO EN "useCart.jsx"
// NO ME FUNCIONÓ UBICANDOLO ACÁ

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

  // REMOVER ITEM
  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  // ITEM EN CARRO?
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const clearCart = () => setCart([]);

  const getCantidadActual = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.cantidad : 0;
  };


  const getCartQuantity = () => { 
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };
  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, getCantidadActual, getCartQuantity, getCartTotal, removeItem, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};