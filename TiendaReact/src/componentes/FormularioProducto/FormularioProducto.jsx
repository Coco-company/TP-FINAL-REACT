import React from 'react';

export function FormularioProducto(){

const formEstilo = {}; //* ACÁ ADENTRO COLOCAR ESTILOS

    return (
        <form style={formEstilo}>
            <h3>Alta producto</h3>
            <div>
                <label>Nombre de Producto</label>
                <input type="text" placeholder="" />
                <label>Precio</label>
                <input type="number" placeholder="$ 0.0" />
                <label>Stock:</label>
                <input type="number" placeholder="Coloque la cantidad en depósito" />
                <label>Imagen</label>
                <input type="file" placeholder="https://..." />
            </div>
            <button type="submit">Guardar Producto</button>
        </form>
    )
}