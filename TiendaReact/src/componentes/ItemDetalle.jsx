import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./ProductoDetalle.module.css";
import { Link } from 'react-router-dom';
import { getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from './../firebase/config';

const ItemDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        if (!id) return;
        const queryId = query(
            collection(db, "productos nacionales"),
            where("id", "==", Number(id))
        );
        getDocs(queryId)
            .then((resp) => {
                if (resp.empty) {
                    console.log("No se encontró el producto");
                    return;
                }
                setProducto({...resp.docs[0].data(), idFirestone: resp.docs[0].id });
            })
            .catch((error) => {
                console.error("Error al cargar el producto:", error);
            });
    }, [id]);

    if (!producto) {
        return <h2>Cargndo detalle del producto...</h2>;
    }

    if (!producto.id) {
        return <h2>Producto no encontrado</h2>;
    }

    return (
        <div className={styles.divProd}>
            <Link to={"/Productos"} style={{ textDecoration: 'none', color: 'black' }}>
                <h2>{producto.nombre}</h2>
                <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '400px' }} />
                <div className={styles.textoPie}>
                    <h3>${producto.precio}</h3>
                    <p>{producto.descripcion}</p>
                    <p>{producto.descripcion}</p>
                </div>
            </Link>
        </div>
    );
};

export default ItemDetalle;