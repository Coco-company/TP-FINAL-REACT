import React from "react";
import {useState} from 'react';
import styles from './Tarjeta.module.css';
import { Link } from 'react-router-dom';


function Tarjeta ({id, nombre, cargo, quote, imagenUrl}){
   
    return (

        <div className={styles.tarjeta}>

            <img src={imagenUrl} alt={nombre} className={styles.mascara}></img>
            <h2>{nombre}</h2>
            <h3>{cargo}</h3>
            <p><i>"{quote}"</i></p>

        </div>
    )
}

export default Tarjeta;