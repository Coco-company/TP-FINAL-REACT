import ItemList from '../item/ItemList.jsx';

function ItemContainer() {  // Children = Elementos hijos. Llama a los componentes contenidos dentro del elemento HTML

    const objItems = [
        {id: '123', nombre: 'Acelga', precio: 10000, stock: 15},
        {id: '234', nombre: 'Choclo', precio: 12000, stock: 17},
        {id: '345', nombre: 'Cebolla', precio: 15000, stock: 19},
    ];

    const estilo = {
        border: "1px solid #ccc",
        padding: "16px",
        margin: "16px 200px",
        backgroundColor: "teal",
    };

    return <ItemList style={estilo} objItems={objItems} />;
}

export default ItemContainer;