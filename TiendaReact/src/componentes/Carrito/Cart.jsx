import React from 'react';
import { useCart } from '../Carrito/useCart.jsx';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = () => {
  
  const { cart, clearCart, getCartTotal, isInCart, removeItem } = useCart();
  

  if(cart.length === 0){
    return (
      <div className={styles.divItemCarroList}>
        <h1>El carrito está vacio</h1>
        <p>Agregá productos desde <Link to="/Productos">acá</Link></p>
      </div>
    )
  }
    
  const Comprado = () => {
    alert("COMPRASTE!, Perdón por el alert!");
    clearCart();
  }

  if (cart.length === 0) {
    return (
      <div className={styles.divItemCarroList}>
        <h2>El carrito está vacío</h2>
        <p>Agrega productos para continuar la compra.</p>
      </div>
    );
  }

  // En caso del carrito con productos
  return (
    <div className={styles.divItemCarroList}>
      <h2>Carrito de Compras</h2>
      {cart.map(item => (
        <div key={item.id} className={styles.divItemCarro}>
          <img src={item.imagen} alt={item.nombre} className={styles.img} />
          <div className={styles.camposCarro}>
            <h3>{item.nombre}</h3>
            <p className={styles.precio}>Precio unitario: ${item.precio}</p>
            <p className={styles.stock}>Cantidad: {item.quantity}</p>
            <p>Subtotal: ${item.precio * item.quantity}</p>
          </div>
          <button onClick={()=>removeItem(item.id)}> 
            <img src={"../../../public/images/iconoEliminar.svg"} alt={"eliminar ${item.nombre}"} />
          </button>
        </div>
      ))}

      <hr />
      <h4>Total a pagar: ${getCartTotal()}</h4>
      <button onClick={clearCart}>Vaciar Carrito</button>
      <button onClick={Comprado}>Comprar Carrito</button>
    </div>
  );
};

export default Cart;