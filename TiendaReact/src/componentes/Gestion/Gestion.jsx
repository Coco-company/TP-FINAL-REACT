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
    const [imagenInicial, setImagenInicial] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [campoError, setCampoError] = useState(["red",""]);      //CAMPO ERROR EN EL FORMULARIO

    // ERROR //
    const avisosUsuario = (color,texto) => {
        setCampoError([color,texto]);
        setTimeout(() => {setCampoError("");},4500);
    }   

    const resetForm = () => {
        setDatosForm(estadoInicialForm);
    }

    const modoEdicion = productoAEditar !== null;

    // Editar producto individual
    const manejarEditar = (producto) => {
        
        setImagenInicial(producto.imagen);

        console.log("Entro el edit", producto); 
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
                 
        if (!imagenFile && !productoAEditar) {      // Si no tengo imagen ni producto a editar, pido imagen
            console.log("Por favor, seleccione una imagen");
            avisosUsuario("red","Por favor, seleccione una imagen");
            return;
        }

        setLoading(true);
        console.log("Loading...");                                  
        
        //* SUBIR IMAGEN A IMGBB
        
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
        console.log("imagenFile: ",imagenFile);                     

        try {

            const Crear = (imagenASubir) => { 
                console.log("Entro en crear:"); 
                let productoCompleto = { ...datosForm, imagen: imagenASubir };
                const productosCollection = collection(db, "productos nacionales");
                addDoc(productosCollection, productoCompleto);
                avisosUsuario("green","Producto guardado correctamente");
            }

            const Actualizar = (imagenASubir) => { 
                console.log("Entro en actualizar:");
                //console.log('Enviando producto a Firebase con imagen',texto,':', productoCompleto);
                let productoCompleto = { ...datosForm, imagen: imagenASubir };
                console.log("productoAEditar con imageFile: ", productoAEditar); 
                const docRef = doc(db, "productos nacionales", productoAEditar.idFirestore);
                updateDoc(docRef, productoCompleto);
                avisosUsuario("green","Producto actualizado correctamente");
            }
            
            if (imagenFile) {        
                //* SUBIDA DE IMAGEN A IMGBB *//
                const formData = new FormData();
                formData.append('image', imagenFile);
                console.log("subiendo imagen a Imgbb...");
                const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: 'POST', body: formData });
                const datosImgbb = await respuestaImgbb.json();
                if (datosImgbb.success) {
                    console.log("Imagen subida con exito. URL:", datosImgbb.data.url);
                    urlImagen = datosImgbb.data.url; //De lograr subirse, La URL se asigna a la variable urlImagen
                }else{
                    throw new Error('La subida de la imagen a Imgbb falló!');
                }
                //* UNIMOS LA url DE LA IMAGEN A LOS OTROS DATOS DEL form
                if (productoAEditar) {  // IMAGEN INICIAL
                    await Actualizar(urlImagen);
                } else {    // Si no hay edicion simplemente se crea
                   await Crear(urlImagen);  // CREADO DE PRODUCTO
                }
            }else if(productoAEditar){  // IMAGEN INICIAL
                await Actualizar(imagenInicial);
            }

        } catch (error) {
            console.log("Error en el proceso de envío:", error);
            avisosUsuario("red","Hubo un error al subir la imagen Por favor intente de nuevo");
        
        
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
            resp.docs.map((doc) => ({ ...doc.data(), idFirestore: doc.id }))
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
            avisosUsuario("red","Producto eliminado");
            //alert("Producto eliminado.");
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