import Asistente from "../Asistente/Asistente.jsx";

function Asistentes({asistProp}){
    return(   
        <div style={{
            display: 'flex',
            gap: '5px',
            justifyContent: 'center'           
        }}>
            {asistProp.map((asist, index) => (
                <Asistente key={index} {...asist}/>
            ))}
            
        </div>    
    )   
}

export default Asistentes;