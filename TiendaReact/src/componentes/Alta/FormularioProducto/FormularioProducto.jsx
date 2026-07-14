import React from 'react';
import styles from './FormularioProducto.module.css';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, loading, modoEdicion, campoError, resetForm}){

    return (
        <div>
            <h1>Gestión de Productos</h1>
            <form className={styles.form} onSubmit={manejarEnvio} onReset={resetForm} >
                <h3 className={styles.h3}>
                    {modoEdicion ? "Editar Producto" : "Alta de Producto"}
                </h3>
                <div className={styles.divProductos}>
                    <label>id (SKU) </label>
                    <input type="text" placeholder="" name="id" value={datosForm.id} onChange={manejarCambio} />

                    <label>Producto </label>
                    <input type="text" placeholder="" name="nombre" value={datosForm.nombre} onChange={manejarCambio} />
                    
                    <label>Precio $ </label>
                    <input type="number" placeholder="0" name="precio" value={datosForm.precio} onChange={manejarCambio} />
                    
                    <label>Stock </label>
                    <input type="number" placeholder="Coloque la cantidad en depósito" name="stock" value={datosForm.stock} onChange={manejarCambio} />
                                    
                    <label>Descripcion </label>
                    <textarea placeholder="Coloque la descripcion del producto" name="descripcion" value={datosForm.descripcion} rows="5" onChange={manejarCambio} />

                    <label>Imagen </label>
                    <input type="file" placeholder="https://..." name="imagen" value={datosForm.imagen} onChange={manejarCambioImagen} />

                    <label>Destacado </label>
                    <input type="checkbox" placeholder="oferta" name="oferta" checked = {datosForm.oferta} onChange={manejarCambio} />
                </div>
                <div className={styles.errorField}>{campoError}</div>
                <button type="submit">
                    {loading ? "Procesando..." : modoEdicion ? "Actualizar Producto" : "Guardar Producto"}
                </button>
                <button type="reset">
                    {loading ? "Procesando..." : modoEdicion ? "Cancelar Actualización" : "Reset"}
                </button>
            </form>
        </div>
    )
}