import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';

import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FormularioProducto } from '../Alta/FormularioProducto/FormularioProducto';



const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const estadoInicialForm = {
        id: "",
        nombre: "",
        oferta: false,
        precio: 0,
        stock: 0,
        descripcion: "",
        destacado: false,
        imagen:""
    };

    const [datosForm, setDatosForm] = useState(estadoInicialForm);

    const [imagenFile, setImagenFile] = useState(null);

    //? const [loading, setLoading] = useState(false);

    const [productoAEditar, setProductoAEditar] = useState(null);

    // Editar producto individual
    const manejarEditar = (producto) => {
        console.log("Entro el edit", producto);
        console.log("PRE setProductoAEditar");
        setProductoAEditar(producto);
        console.log("PRE setDatosForm");
        setDatosForm(producto);    

    };

    const manejarCambio = (evento) => {
        // TOMO LOS DATOS DEL EVENTO LOS GUARDO Y ACTUALIZO EL OBJ datosForm
        const { name, value, type, checked } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]:type==="checkbox" ? checked :value
        });
    };

    const manejarCambioImagen = (evento) => {
        console.log(evento.target.files[0]);
        setImagenFile(evento.target.files[0]);
    };

    // crear un producto en Firebase
    const manejarEnvio = async (evento) => {
        evento.preventDefault(); //* EVITAMOS LA RECARGA *//

        console.log("Enviar al form", evento);


        if (!imagenFile) { //Chequear si hay imagen
            alert("por favor selecciona una imagen para el producto");
            return;
        }

        // Agregamos contador
    //?    setLoading(true);
        console.log("Loading...");

        //* SUBIR IMAGEN A IMGBB
        const apiKey = 'b6301cee8b325572aea89f024a152ef7';

        //* OBJETO FormData PARA ENVIAR ARCHIVOS Y DATOS DE FORMULARIO 
        const formData = new FormData();
        formData.append('image', imagenFile);

        try {
            console.log("subiendo imagen a Imgbb...");

            const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData
            });

            const datosImgbb = await respuestaImgbb.json();

            if (datosImgbb.success) {
                console.log("Imagen subida con exito. URL:", datosImgbb.data.url);

                //* UNIMOS url DE LA IMAGEN LOS OTROS DATOS DEL form
                const productoCompleto = {
                    ...datosForm,
                    imagen: datosImgbb.data.url
                };

                console.log('Enviando producto a Firebase:', productoCompleto);
                
                // Obtenemos la instancia de la base de datos
                
                // Apuntamos a la colección "productos" (si no existe se crea)
                const productosCollection = collection(db, "productos nacionales");
                // Agregamos el nuevo documento a la colección
                await addDoc(productosCollection, productoCompleto);
                
                await cargarProductos();

            } else {
                throw new Error('La subida de la imagen a Imgbb falló!');
            }

        } catch (error) {
            console.log("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen Por favor intente de nuevo.");
        }

        // finalmente desactivamos loading
    //?    finally {setLoading(false)};

        // Vaciamos el formulario
        setDatosForm(estadoInicialForm);
        setImagenFile(null);

    };

    const cargarProductos = async () => {
        const productosRef = collection(db, "productos nacionales");
        const resp = await getDocs(productosRef);
        setProductos(
            resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    };

    // Obtecion de productos
    useEffect(() => {
        cargarProductos();
    }, []);    // [productos]?


    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto ? ");
        if (confirmacion) {
            const docRef = doc(db, "productos nacionales", id);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    };

    return (
        <div>
            <h2>Gestión de Productos</h2>
            {/*<FormularioContainer datosForm={estadoInicialForm} />*/}
            <FormularioProducto 
                datosForm={datosForm} 
                manejarCambio={manejarCambio} 
                manejarEnvio={manejarEnvio} 
                manejarCambioImagen={manejarCambioImagen} 
//?                loading={loading}
            />
            <hr />
            <h3>Lista de Productos</h3>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        {prod.nombre} ${prod.precio}
                        <button onClick={() => manejarEditar(prod)} style={{ marginLeft: '10px' }}>
		                    Editar
		                </button>
                        <button onClick={() => handleDelete(prod.id)} style={{ marginLeft: '10px' }}>
		                    Eliminar
		                </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Gestion;