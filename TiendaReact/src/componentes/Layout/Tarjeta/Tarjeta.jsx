import styles from './Tarjeta.module.css';

function Tarjeta ({nombre, cargo, quote, imagenUrl}){
   
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