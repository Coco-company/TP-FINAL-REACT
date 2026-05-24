import TarjetaLista from '../TarjetaLista/TarjetaLista.jsx';
import styles from './TarjetaListaCont.module.css';
import react, { useState, useEffect } from 'react';

function TarjetaListaCont() {  // Children = Elementos hijos. Llama a los componentes contenidos dentro del elemento HTML

    const [tarjetas, setTarjetas] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/Personal.json')
        .then((respuesta) => {
            if (!respuesta.ok){
                throw new Error('No se pudo cargar la información del personal');
            };
        return respuesta.json();
        })
        .then((datos) => {
            setTarjetas(datos);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setCargando(false);
        });
    }, []);

    if(cargando){
        return <p>Cargando Tarjetas, por favor espere...</p>;
    }
    if(error){
        return <p>Error: {error}</p>;
    }

    return <TarjetaLista className={styles.divItemListCont} objPersonal={tarjetas} />;
}

export default TarjetaListaCont;