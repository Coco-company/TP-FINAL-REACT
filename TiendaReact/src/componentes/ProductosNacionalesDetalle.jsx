import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Importaciones clave para obtener un solo documento
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import styles from "./Productos/ProductoDetalle/ProductoDetalle.module.css";
import { Link } from 'react-router-dom';

const ProductosNacionalesDetalle = () => {
    const {id} = useParams(); //Tomamos el parámetro id
    const [producto, setItem] = useState(null);


    useEffect(() => {
        if (id) {
            //console.log("ID: "+id);
            // Creamos la referencia al documento
            const docRef = doc(db, "productos nacionales", id);
            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) { // Verificamos si el documento existe
                        setItem({ ...resp.data(), id: resp.id });
                    } else {
                        console.log("No se encontró el producto");
                    }
                })
                .catch(error => console.log(error));
        }
    }, [id]);

    return (
        <div className={styles.divProd}>
            { producto ? ( 
                <>
                    <h2>{producto.nombre}</h2>
                    <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '400px'}} />
                    <div className={styles.textoPie}>
                        <h3>${producto.precio}</h3>
                        <p>{producto.descripcion}</p>
                        <Link to={"/ProductosNacionales"} style={{ textDecoration: 'none', color: 'black', fontWeight: '700',}}><p>Volver</p></Link> 
                    </div>
                </> 
                ) : ( <p>Cargando producto...</p> )
            }
        </div>
    );
};

export default ProductosNacionalesDetalle;