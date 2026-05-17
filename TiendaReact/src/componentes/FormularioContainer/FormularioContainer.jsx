import React, { useState } from 'react';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto.jsx';

export function FormularioContainer(){

    const [ datosForm, setDatosForm ] = useState({
        nombre: '',
        preico: '',
        stock: '',
        urlImagen: ''
    });

    const manejarCambio = (evento) => {
        
        //* TOMO LOS DATOS DEL EVENTO LOS GUARDO Y ACTUALIZO EL OBJ datosForm *//
        const {name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarEnvio = (evento) => {
        //* EVITAMOS LA RECARGA *//
        evento.preventDefault();
        console.log('Enviamos los siguientes datos a la API:', datosForm);
    }

    return (
        //* DEVUELVO EL ELEMENTO formularioProducto CONTENIENDO LAS LOGICAS DE COMPORTAMIENTO Y LOS DATOS *//
        <FormularioProducto datosForm={datosForm} manejarCambio={manejarCambio} manejarEnvio={manejarEnvio} />
    );

}