import ItemList from '../ItemList/ItemList.jsx';
import productos from '/public/data/productos.json';

function ItemListContainer() {  // Children = Elementos hijos. Llama a los componentes contenidos dentro del elemento HTML

    const estilo = {
        border: "1px solid #ccc",
        padding: "16px",
        margin: "16px 200px",
        backgroundColor: "teal",
    };

    return <ItemList style={estilo} objItems={productos} />;
}

export default ItemListContainer;