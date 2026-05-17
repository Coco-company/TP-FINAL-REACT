import React from 'react';

export function FormularioProducto(){

const formEstilo = {
    diplay:'flex',
    
    maxWidth: '24rem',
    margin: '3rem auto',
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    gap: '16px'
}; //* ACÁ ADENTRO COLOCAR ESTILOS

    return (
        <form style={formEstilo}>
            <h3>Alta producto</h3>
            <div>
                <label>Nombre de Producto </label>
                <input type="text" placeholder="" />
                <br/>
                <label>Precio </label>
                <input type="number" placeholder="$ 0.0" />
                <br/>
                <label>Stock </label>
                <input type="number" placeholder="Coloque la cantidad en depósito" />
                <br/>
                <label>Imagen </label>
                <input type="file" placeholder="https://..." />
            </div>
            <button type="submit">Guardar Producto</button>
        </form>
    )
}