import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [campoError, setCampoError] = useState(["red",""]); 

    const avisosUsuario = (color,texto) => {
        setCampoError([color,texto]);
        setTimeout(() => {setCampoError("");},4500);
    }   

    const handleLogin = (e) => {
        e.preventDefault();

        const auth = getAuth(); //Guarda datos de autenticacion

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => { // respuesta de Firebase
                const user = userCredential.user;
                console.log("Usuario logueado:", user);
                //alert("¡Inicio de sesión exitoso!");
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error en el login:", errorCode, errorMessage);
                avisosUsuario("red","Error:"+ errorMessage);
                //alert("Error: " + errorMessage);
            }
        );
    };

    return (
        <div className={styles.divGeneral}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button type="submit">Ingresar</button>
            </form>
            <div className={styles.errorField} style={{ color: campoError[0]}}><b>{campoError[1]}</b></div>
            <p>¿No tenés una cuenta? <Link className={styles.regLink} to="/registro">Registrate aquí</Link></p>
        </div>
    );
};

export default Login;