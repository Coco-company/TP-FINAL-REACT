import {Item} from "../Item/Item.jsx";
import styles from "./ItemList.module.css";

function ItemList({objItems}){
    return(
        <div className={styles.divItemList}>
            {objItems.map((item) => (
                <Item key={item.id} {...item}/>
            ))}
        </div>
    )
}

export default ItemList;