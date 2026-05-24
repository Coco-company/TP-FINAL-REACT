import React from "react";
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className={styles.divHome}>
            <h1>La Pagina de Inicio</h1>
        </div>    
    );
}

export default Home;