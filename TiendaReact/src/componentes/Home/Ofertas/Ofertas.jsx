import {useState} from 'react';
import styles from './Ofertas.module.css';
import { Link } from 'react-router-dom';

const Ofertas = ({id, nombre, precio, stock, imagen}) => {
    const [cantidad, setCantidad] = useState(0);
    
    const incrementar = () => {
        if(cantidad < stock){setCantidad(cantidad+1); }
    };
    const decrementar = () => {
        if(cantidad < stock){setCantidad(cantidad-1); }
    };

    const agregarAlCarrito = () => {
        //alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    }

    return (
        <div key={id} className={styles.ofertaItem}>
            
                <h3 className={styles.h3}>{nombre}</h3>
                <img src={imagen} alt={nombre} />
                <p className={styles.precio}>${precio}</p>
                <p className={styles.stock}>Stock: {stock}</p>
            
            <div className={styles.divAgrQuit} >
                <button onClick={incrementar} >+</button>
                <button onClick={decrementar} >-</button>
            </div>
            <button onClick={agregarAlCarrito} >Agregar al Carrito</button>
        </div>
    )
}

export default Ofertas;