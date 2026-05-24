import Ofertas from "../Ofertas/Ofertas.jsx";
import styles from "./OfertasList.module.css";



function OfertasList({objItems}){
    return(
        <div className={styles.divItemList}>
            {objItems.map((item) => (
                item.oferta ? <Ofertas key={item.id} {...item}/> : false  
            ))}
        </div>
    )
}

export default OfertasList;