import OfertasList from '../OfertasList/OfertasList.jsx';
import styles from './OfertasListContainer.module.css';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config.js';

function OfertasListContainer() {  // Children = Elementos hijos. Llama a los componentes contenidos dentro del elemento HTML

    const [productos, setProductos] = useState([]);
    //const [error, setError] = useState(null);
    //const [cargando, setCargando] = useState(true);

useEffect(() => {
        const productosDB = collection(db, "productos nacionales")
        getDocs(productosDB).then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                })
            );
        })
    }, []);

    return <OfertasList className={styles.OfertasList} objItems={productos} />;
}

export default OfertasListContainer;