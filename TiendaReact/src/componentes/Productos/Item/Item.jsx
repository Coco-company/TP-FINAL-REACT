import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../Carrito/useCart.jsx';
import styles from './Item.module.css';

export function Item({id, nombre, precio, stock, imagen}){
    const producto = {id, nombre, precio, stock, imagen};
    // Traemos la función del contexto
    const { addToCart } = useCart(); 
    const [cantidad, setCantidad] = useState(0);


    const incrementar = () => {
        if(cantidad < stock){setCantidad(cantidad+1); }
    };
    const decrementar = () => {
        if(cantidad < stock){setCantidad(cantidad-1); }
    };
   
    const handleAddToCart = () => {
        addToCart(producto, cantidad);
        //alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    };

    return (
        <div key={id} className={styles.divItem}>
            <Link to={`/Producto/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <h3 className={styles.h3}>{nombre}</h3>
                <img src={imagen} alt={nombre} />
                <p className={styles.precio}>${precio}</p>
                <p className={styles.stock}>Stock: {stock} - <i>Clic para más info.</i></p>
            </Link>
            <div className={styles.divAgrQuit} >
                <button onClick={incrementar} >+</button>
                {/* <p>Cantidad en carro ${cantidadActual}</p>*/}
                <button onClick={decrementar} >-</button>
            </div>
            <button onClick={handleAddToCart}> Agregar {cantidad} al Carrito</button>
        </div>
    );
}

export default Item;