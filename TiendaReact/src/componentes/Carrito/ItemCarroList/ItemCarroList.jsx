import Item from "../ItemCarro/ItemCarro.jsx";
import styles from "./ItemCarroList.module.css";

function ItemCarroList({objItems}){
    return(
        <div className={styles.divItemCarroList}>
            <h2>Carrito de Compras</h2>
            {objItems.map((item) => (
                <Item key={item.id} {...item}/>
            ))}
        </div>
    )
}

export default ItemCarroList;