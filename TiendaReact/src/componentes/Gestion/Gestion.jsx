import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { FormularioContainer } from '../Alta/FormularioContainer/FormularioContainer';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const estadoInicialForm = {
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
        imagen: ""
    };
    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "productos nacionales");
            const resp = await getDocs(productosRef);
            setProductos(
                resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        fetchProductos();
    }, []); // [productos] ó [] ???
    
    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Seguro desea eliminar este producto ? ");
        if (confirmacion) {
            const docRef = doc(db, "productos", id);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    };
    
    return (
        <div>
            <h2>Gestión de Productos</h2>
            <hr />
            <FormularioContainer />
            <hr />
            <h3>Lista de Productos</h3>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        {prod.nombre} - ${prod.precio}
                        {/*acá agregaremos los botones de acción */}
                        <button onClick={() => handleDelete(prod.id)} style={{ marginLeft: '10px' }} >
		                    Eliminar
		                </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Gestion;