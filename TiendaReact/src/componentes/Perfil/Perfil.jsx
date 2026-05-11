import React from "react";
import Tarjeta from "../Tarjeta/Tarjeta.jsx"; //Carpeta Hermana

function Perfil(){   // Podemos exportar directamente desde la func
    const usuario = {nombre: "Pepe", apellido: "Argento"}
    return (
        <Tarjeta nombre={usuario.nombre} apellido={usuario.apellido} />
    );
}

export default Perfil;