import OfertasList from '../OfertasList/OfertasList.jsx';
import styles from './OfertasListContainer.module.css';
import { useState, useEffect } from 'react';

function OfertasListContainer() {  // Children = Elementos hijos. Llama a los componentes contenidos dentro del elemento HTML

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/productos.json')
        .then((respuesta) => {
            if (!respuesta.ok){
                throw new Error('No se pudo cargar la información de los productos');
            };
        return respuesta.json();
        })
        .then((datos) => {
            setProductos(datos);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setCargando(false);
        });
    }, []);

    if(cargando){
        return <p>Cargando Productos, por favor espere...</p>;
    }
    if(error){
        return <p>Error: {error}</p>;
    }
    return <OfertasList className={styles.OfertasList} objItems={productos} />;
}

export default OfertasListContainer;