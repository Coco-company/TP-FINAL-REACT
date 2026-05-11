function Asistente({nombre, tareas, emoji}) {
    return (
        <div style={{
            backgroundColor: 'beige',
            borderRadius:'15px',
            margin: '20px',
            padding: '10px 20px'
        }}>
            <h3 style={{margin: '5px',}}>{nombre}</h3>
            <p>{tareas} {emoji}</p>
        </div>
    );
}

export default Asistente;