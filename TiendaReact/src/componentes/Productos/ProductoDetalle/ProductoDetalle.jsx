import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./ProductoDetalle.module.css";
import { Link } from 'react-router-dom';
import {  doc, getDoc , query, collection, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebase/config';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        if (id) {
            //console.log("ID: "+id);
            // Creamos la referencia al documento
            const docRef = doc(db, "productos nacionales", id);
            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) { // Verificamos si el documento existe
                        setProducto({ ...resp.data(), id: resp.id });
                    } else {
                        console.log("No se encontró el producto");
                    }
                })
                .catch(error => console.log("Coso",error));
        }
    }, [id]);

    return (
        <div className={styles.divProd}>
            { producto ? ( // lo retiene hasta que se "lea" el contenido de "producto"
                <>
                    <h2>{producto.nombre}</h2>
                    <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '400px'}} />
                    <div className={styles.textoPie}>
                        <h3>${producto.precio}</h3>
                        <p>{producto.descripcion}</p>
                        <Link to={"/Productos"} style={{ textDecoration: 'none', color: 'black', fontWeight: '700',}}><p>Volver</p></Link> 
                    </div>
                </> 
                ) : ( <p>Cargando producto...</p> )
            }
        </div>

    );
};

export default ProductoDetalle;