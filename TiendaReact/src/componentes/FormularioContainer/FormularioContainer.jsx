import React, { useState } from 'react';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto.jsx';

export function FormularioContainer(){

    const [ datosForm, setDatosForm ] = useState({
        nombre: '',
        preico: '',
        stock: ''
    });

    //* CODIGO PARA IMAGEN
    const [imagenFile, setImagenFile] = useState(null);

    const manejarCambio = (evento) => {
        
        //* TOMO LOS DATOS DEL EVENTO LOS GUARDO Y ACTUALIZO EL OBJ datosForm *//
        const {name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const manejarEnvio = async (evento) => {
        //* EVITAMOS LA RECARGA *//
        evento.preventDefault();
        //*        console.log('Enviamos los siguientes datos a la API:', datosForm);

        if(!imagenFile){
            alert("por favor selecciona una imagen para el producto");
            return;
        }

        //* SUBIR IMAGEN A IMGBB
        const apiKey = '5b34ca3e590a988793a9e6e76fa17930';
        //* OBJETO FormData PARA ENVIAR ARCHIVOS Y DATOS DE FORMULARIO 
        const formData = new FormData();
        formData.append('image',imagenFile);

        try {
            console.log("subiendo imagen a Imgbb...");
            const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`,{
                method: 'POST',
                body: formData
            });

            const datosImgbb = await respuestaImgbb.json();

            if(datosImgbb.success){
                console.log("Imagen subida con exito. URL:", datosImgbb.data.url);
                
                //* UNIMOS url DE LA IMAGEN LOS OTROS DATOS DEL form
                const productoCompleto = {
                    ...datosForm,
                    urlImagen: datosImgbb.data.url
                };
                
                console.log("Enviamos los siguientes datos completos a la API:", productoCompleto);

            }else{
                throw new Error('La subida de la imagen a Imgbb falló!');
            }

        } catch(error) {
            console.log("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen Por favor intente de nuevo.");
        }
        
    };

    return (
        //* DEVUELVO EL ELEMENTO formularioProducto CONTENIENDO LAS LOGICAS DE COMPORTAMIENTO Y LOS DATOS *//
        <FormularioProducto datosForm={datosForm} manejarCambio={manejarCambio} manejarEnvio={manejarEnvio} manejarCambioImagen={manejarCambioImagen}/>
    );

}