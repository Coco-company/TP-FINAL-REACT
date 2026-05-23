import Tarjeta from "../Tarjeta/Tarjeta";
import styles from "./TarjetaLista.module.css";

function TarjetaLista({objPersonal}){
    
    return(
        <div className={styles.divTarjetaLista}>
            {objPersonal.map((persona) => (
                <Tarjeta key={persona.id} {...persona}/>
            ))}
        </div>
    )
}

export default TarjetaLista;