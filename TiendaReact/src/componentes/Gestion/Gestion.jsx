import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';

import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FormularioProducto } from '../Alta/FormularioProducto/FormularioProducto';

import styles from './Gestion.module.css';

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

    // ESTADOS //
    const [datosForm, setDatosForm] = useState(estadoInicialForm);
    const [imagenFile, setImagenFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState(null);

    const [campoError, setCampoError] = useState("");      //CAMPO ERROR EN EL FORMULARIO

    const resetForm = () => {
        setDatosForm(estadoInicialForm);
    }

    const modoEdicion = productoAEditar !== null;

    // Editar producto individual
    const manejarEditar = (producto) => {
        
        console.log("Entro el edit", producto); //!ok
        //delete producto.imagen; 
        producto.imagen = "";
        
        setProductoAEditar(producto);       //? Sin fallas Pero "productoAEditar" no carga, deberia ser promesa?
        //console.log("productoAEditar: ", productoAEditar);
        setDatosForm(producto);            // Pobla la forma
    };

    // FUNCUIONES ONCHANGE //
    const manejarCambio = (evento) => {
        // TOMO LOS DATOS DEL EVENTO DE CADA INPUT LOS GUARDO Y ACTUALIZO EL OBJ datosForm
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

    // crear un producto en Firebase [CREATE & EDIT]
    const manejarEnvio = async (evento) => {    //ACCION DISPARADA POR FORM SUBMIT
        evento.preventDefault(); //* EVITAMOS LA RECARGA *//
        let urlImagen = datosForm.imagen; //Guardamos imagen actual
        
        console.log("Enviar al form", evento);

        if (!imagenFile && !productoAEditar) {
            console.log("Por favor, seleccione una imagen");
            setCampoError("Por favor, seleccione una imagen");
            setTimeout(() => {setCampoError("");},4000);
           // alert("Por favor, selecciona una imagen.");
            return;
        }

        setLoading(true);
        console.log("Loading...");
        
        //* SUBIR IMAGEN A IMGBB
        const apiKey = 'b6301cee8b325572aea89f024a152ef7'; 
        
        console.log("imagenFile: ",imagenFile);

        try {
            if (imagenFile) {        
                //* OBJETO FormData PARA ENVIAR ARCHIVOS Y DATOS DE FORMULARIO 
                const formData = new FormData();
                formData.append('image', imagenFile);

                console.log("subiendo imagen a Imgbb...");

                const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData
                });

                const datosImgbb = await respuestaImgbb.json();

                if (datosImgbb.success) {
                    console.log("Imagen subida con exito. URL:", datosImgbb.data.url);
                    urlImagen = datosImgbb.data.url; //De lograr subirse, La URL se asigna a la variable urlImagen
                }else{
                    throw new Error('La subida de la imagen a Imgbb falló!');
                }

                //* UNIMOS LA url DE LA IMAGEN A LOS OTROS DATOS DEL form
                const productoCompleto = { ...datosForm, imagen: urlImagen };

                console.log('Enviando producto a Firebase:', productoCompleto);
                
                // Obtenemos la instancia de la base de datos
                
                // Apuntamos a la colección "productos" (si no existe se crea)
                if (productoAEditar) {
                    const docRef = doc(db, "productos nacionales", productoAEditar.id); //?idFirestore
                    await updateDoc(docRef, productoCompleto);
                    alert("Producto actualizado correctamente");

                } else {
                    const productosCollection = collection(db, "productos nacionales");
                    await addDoc(productosCollection, productoCompleto);
                    alert("Producto guardado correctamente");
                }
            }

        } catch (error) {
            console.log("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen Por favor intente de nuevo.");
        
        } finally {
            setLoading(false); // finalmente desactivamos loading
        };
        
        await cargarProductos(); // Recargamos la lista
        evento.target.reset();   // Reseteamos los controles del form
        resetForm(); // Vaciamos el formulario
        setImagenFile(null);     // Blanqueo los setters
        setProductoAEditar(null);// Blanqueo los setters
    };

    const cargarProductos = async () => {
        const productosRef = collection(db, "productos nacionales");
        const resp = await getDocs(productosRef);
        setProductos(
            resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))  //? ,idFirestore:
        );
    };

    // Obtecion de productos
    useEffect(() => {
        cargarProductos();
    }, []);    // [productos]?

    // [DELETE]
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
        <div className={styles.divProductos}>
            {/*<FormularioContainer datosForm={estadoInicialForm} />*/}
            <FormularioProducto 
                datosForm={datosForm} 
                manejarCambio={manejarCambio} 
                manejarEnvio={manejarEnvio} 
                manejarCambioImagen={manejarCambioImagen} 
                loading={loading}
                modoEdicion={modoEdicion}
                campoError={campoError}
                resetForm={resetForm}
            />
            
            <h3 className={styles.h3}>Lista de Productos</h3>
            <ul className={styles.ul}>
                {productos.map((prod) => (
                    //? idFirestore
                    <li key={prod.id} className={styles.divItem}> 
                        <span>{prod.nombre} ${prod.precio}</span>
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