import ItemList from '../ItemList/ItemList.jsx';
import styles from './ItemListContainer.module.css';
import { useState, useEffect } from 'react';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config.js';

function ItemListContainer() {  // Children = Elementos hijos. Llama a los componentes contenidos dentro del elemento HTML

    const [productos, setProductos] = useState([]);
    // const [error, setError] = useState(null);
    // const [cargando, setCargando] = useState(true);


useEffect(() => {
        const productosDB = collection(db, "productos nacionales")
        getDocs(productosDB).then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                })
            );
        })
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez
    
    return <ItemList className={styles.divItemListCont} objItems={productos} />;
}

export default ItemListContainer;