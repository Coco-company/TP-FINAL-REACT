function Contenedor ({children}) {  // Children = Elementos hijos. Llama a los componentes contenidos dentro del elemento HTML
    const estilo = {
        border: "1px solid #ccc",
        padding: "16px",
        margin: "16px 200px",
        backgroundColor: "teal",
    };

    return <div style={estilo}> {children} </div>;
}

export default Contenedor;