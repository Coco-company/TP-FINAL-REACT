import {useState} from 'react';
import styles from './Item.module.css';

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
            <h3 className={styles.h3}>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Stock disponible {stock}</p>
            <img src={imagen} alt={nombre} />
            <div className={styles.divAgrQuit} >
                <button onClick={incrementar} >+</button>
                <button onClick={decrementar} >-</button>
            </div>
            <button onClick={agregarAlCarrito} >Agregar al Carrito</button>
        </div>
    )
}

//*export default Item;**//