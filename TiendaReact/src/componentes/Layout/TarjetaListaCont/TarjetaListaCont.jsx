import TarjetaLista from '../TarjetaLista/TarjetaLista.jsx';
import styles from './TarjetaListaCont.module.css';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config.js';

function TarjetaListaCont() {  // Children = Elementos hijos. Llama a los componentes contenidos dentro del elemento HTML

    const [tarjetas, setTarjetas] = useState([]);
  //  const [error, setError] = useState(null);
   // const [cargando, setCargando] = useState(true);

useEffect(() => {
        const productosDB = collection(db, "personal")
        getDocs(productosDB).then((resp) => {
            setTarjetas(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                })
            );
        })
    }, []);

    return <TarjetaLista className={styles.divItemListCont} objPersonal={tarjetas} />;
}

export default TarjetaListaCont;