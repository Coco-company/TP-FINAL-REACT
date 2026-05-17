import {useState} from 'react';

export function Item({id, nombre, precio, stock}){
    const [cantidad, setCantidad] = useState(0);
    
    const incrementar = () => {
        if(cantidad < stock){setCantidad(cantidad+1); }
    };
    const decrementar = () => {
        if(cantidad < stock){setCantidad(cantidad-1); }
    };

    const agregarAlCarrito = () => {
    alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    }

    return (
        <div key={id} style={{ border:'1px solic #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center', backgroundColor:'azure' }}>
            <h3>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Stock disponible ${stock}</p>
            <div style={{ display:'flex', alignItems: 'center', justifyContent: 'center', margin:'10px 0'  }}>
                <button onClick={incrementar} >+</button>
                <button onClick={decrementar} >-</button>
            </div>
            <button onClick={agregarAlCarrito} >Agregar al Carrito</button>
        </div>

    )
}
