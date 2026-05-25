import {Item} from "../../Productos/Item/Item.jsx";
import styles from "./OfertasList.module.css";

function OfertasList({objItems}){
    return(
        <div className={styles.divItemList}>
            {objItems.map((item) => (
                item.oferta ? <Item key={item.id} {...item}/> : false  
            ))}
        </div>
    )
}

export default OfertasList;