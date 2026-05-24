import {useState} from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';

export function Item({id, nombre, precio, stock, imagen}){
    const [cantidad, setCantidad] = useState(0);
    
    const incrementar = () => {
        if(cantidad < stock){setCantidad(cantidad+1); }
    };
    const decrementar = () => {
        if(cantidad < stock){setCantidad(cantidad-1); }
    };

    const agregarAlCarrito = () => {
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    }

    return (
        <div key={id} className={styles.divItem}>
            <Link to={`/Producto/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <h3 className={styles.h3}>{nombre}</h3>
                <img src={imagen} alt={nombre} />
                <p className={styles.precio}>${precio}</p>
                <p className={styles.stock}>Stock: {stock}</p>
            </Link>
            <div className={styles.divAgrQuit} >
                <button onClick={incrementar} >+</button>
                <button onClick={decrementar} >-</button>
            </div>
            <button onClick={agregarAlCarrito} >Agregar al Carrito</button>
        </div>
    )
}

//*export default Item;**//