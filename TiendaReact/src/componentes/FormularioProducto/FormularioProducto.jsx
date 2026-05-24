import React from 'react';
import styles from './FormularioProducto.module.css';

export function FormularioProducto({datosForm, manejarCambio, manejarEnvio}){

    return (
        <div className={styles.divProductos}>
            <form className={styles.form} onSubmit={manejarEnvio} >
                <h3 className={styles.h3}>Alta de Producto</h3>
                <div>
                    <label>Producto </label>
                    <input type="text" placeholder="" name="nombre" value={datosForm.nombre} onChange={manejarCambio} />
                    
                    <label>Precio $ </label>
                    <input type="number" placeholder="0" name="precio" value={datosForm.precio} onChange={manejarCambio} />
                    
                    <label>Stock </label>
                    <input type="number" placeholder="Coloque la cantidad en depósito" name="stock" value={datosForm.stock} onChange={manejarCambio} />
                                    
                    <label>Descripcion </label>
                    <textarea placeholder="Coloque la descripcion del producto" name="descripcion" value={datosForm.descripcion} rows="5" onChange={manejarCambio} />

                    <label>Imagen </label>
                    <input type="file" placeholder="https://..." name="imagen" value={datosForm.imagen} onChange={manejarCambio} />
                </div>
                
                <button type="submit">Guardar Producto</button>
            </form>
        </div>
    )
}