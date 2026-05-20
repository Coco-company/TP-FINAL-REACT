import {Item} from "../item/Item.jsx";

function ItemList({objItems}){
    return(   
        <div style={{
            display: 'flex',
            gap: '25px',
            justifyContent: 'center',
            flexWrap: 'wrap'       
        }}>
            {objItems.map((item) => (
                <Item key={item.id} {...item}/>
            ))}
            
        </div>    
    )   
}

export default ItemList;