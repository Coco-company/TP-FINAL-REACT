import { useState } from 'react';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto.jsx';
import { getFirestore, collection, addDoc } from 'firebase/firestore';



export function FormularioContainer() {

    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: 0,
        stock: 0,
        categoria: '',
        imagenFile: ''
    });

    // CODIGO PARA IMAGEN
    const [imagenFile, setImagenFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const manejarCambio = (evento) => {
        // TOMO LOS DATOS DEL EVENTO LOS GUARDO Y ACTUALIZO EL OBJ datosForm
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault(); //* EVITAMOS LA RECARGA *//

        if (!imagenFile) { //Chequear si hay imagen
            alert("por favor selecciona una imagen para el producto");
            return;
        }

        // Agregamos contador
        setLoading(true);
        console.log("Loading...");

        //* SUBIR IMAGEN A IMGBB
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

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
                    urlImagen: datosImgbb.data.url
                };

                console.log('Enviando producto a Firebase:', productoCompleto);
                
                // Obtenemos la instancia de la base de datos
                const db = getFirestore();
                // Apuntamos a la colección "productos" (si no existe se crea)
                const productosCollection = collection(db, "productos nacionales");
                // Agregamos el nuevo documento a la colección
                await addDoc(productosCollection, productoCompleto);

            } else {
                throw new Error('La subida de la imagen a Imgbb falló!');
            }

        } catch (error) {
            console.log("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen Por favor intente de nuevo.");
        }
        // finalmente desactivamos loading
        finally {setLoading(false)};
    };

    return (
        //* DEVUELVO EL ELEMENTO formularioProducto CONTENIENDO LAS LOGICAS DE COMPORTAMIENTO Y LOS DATOS *//
        <FormularioProducto 
            datosForm={datosForm} 
            manejarCambio={manejarCambio} 
            manejarEnvio={manejarEnvio} 
            manejarCambioImagen={manejarCambioImagen} 
            loading={loading}
        />
    );
}