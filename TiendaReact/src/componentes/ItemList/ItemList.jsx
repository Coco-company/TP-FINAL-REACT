import {Item} from '../../Item_/Item';

function ItemList({objItems}){
    return(   
        <div style={{
            display: 'flex',
            gap: '25px',
            justifyContent: 'center'           
        }}>
            {objItems.map((item) => (
                <Item key={item.id} {...item}/>
            ))}
            
        </div>    
    )   
}

export default ItemList;