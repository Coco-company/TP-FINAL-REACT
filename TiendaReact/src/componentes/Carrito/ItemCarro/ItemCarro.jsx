import {useState} from 'react';
import styles from './ItemCarro.module.css';
import { Link } from 'react-router-dom';

const ItemCarro = ({id, nombre, precio, stock, imagen}) => {
    const [cantidad, setCantidad] = useState(0);
    
    const incrementar = () => {
        if(cantidad < stock){setCantidad(cantidad+1); }
    };
    const decrementar = () => {
        if(cantidad < stock){setCantidad(cantidad-1); }
    };

    return (

        <div key={id} className={styles.divItemCarro}>
            <img src={imagen} alt={nombre} className={styles.img} />
            <div className={styles.camposCarro}>
                <h3 className={styles.h3}>{nombre}</h3>
                <p className={styles.precio}>${precio}</p>
                <p className={styles.stock}>Stock: {stock}</p>
                <div className={styles.divAgrQuit} >
                    <button onClick={incrementar} >+</button>
                    <button onClick={decrementar} >-</button>
                </div>
            </div>
        </div>

    )
}

export default ItemCarro;