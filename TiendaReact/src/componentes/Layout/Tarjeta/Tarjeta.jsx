import React from "react";
import {useState} from 'react';
import styles from './Tarjeta.module.css';
import { Link } from 'react-router-dom';
import CircularImage from './CircularImage.jsx';



function Tarjeta ({id, nombre, cargo, quote, imagenUrl}){
   
    return (
        <dir className={styles.tarjeta}>
            <CircularImage id={id} imagenUrl={imagenUrl}/>
            
            <h2>{nombre}</h2>
            <h3>{cargo}</h3>
            <p><i>"{quote}"</i></p>

        </dir>
    )
}

export default Tarjeta;