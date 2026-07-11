import {useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import styles from "./ProductoDetalle.module.css";
import { Link } from 'react-router-dom';

const ProductoDetalle = () => {
    alert("paso");
    const {id} = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch('/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const ProductoEncontrado = data.find(p => p.id === parseInt(id));
                setProducto(ProductoEncontrado);
            })
            .catch(error => console.error("Error al cargar el producto:", error));
    }, [id]);


    if(!producto){
        return <h2>Cargndo detalle del producto...</h2>;
    }

    if(!producto.id){
        return <h2>Producto no encontrado</h2>;
    }

    return (
        <div className={styles.divProd}>
            <Link to={"/Productos"} style={{ textDecoration: 'none', color: 'black' }}>
                <h2>{producto.nombre}</h2>
                <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '400px'}} />
                <div className={styles.textoPie}>
                    <h3>${producto.precio}</h3>
                    <p>{producto.descripcion}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductoDetalle;