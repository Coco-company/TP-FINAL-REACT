import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import styles from './GestionCupones.module.css';

const GestionCupones = () => {
    // ESTADOS //
    const [codigo, setCodigo] = useState("");
    const [descuento, setDescuento] = useState("");
    const [cupones, setCupones] = useState([]);
    const [campoError, setCampoError] = useState(["red",""]);  
    
    const avisosUsuario = (color,texto) => {
        setCampoError([color,texto]);
        setTimeout(() => {setCampoError("");},4500);
    }   

    // Cargar cupones
    const obtenerCupones = async () => {
        try {
            const respuesta = await getDocs(collection(db, "cupones"));
            const lista = respuesta.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })
            );

            setCupones(lista);
        } catch (error) {
            console.error("Error al obtener los cupones:", error);
            avisosUsuario("red","Ocurrió un error al cargar los cupones");
        }
    };


    // Obtecion de cupones
    useEffect(() => {
           obtenerCupones();
    }, [cupones]);

    // Crear cupón
    const crearCupon = async (e) => {
        e.preventDefault();
        if (!codigo || !descuento) {
            //alert("Complete todos los campos");
            avisosUsuario("yellow","Complete todos los campos");
            return;
        }

        const porcentaje = Number(descuento);
        if (porcentaje < 1 || porcentaje > 100) {
            //alert("El descuento debe estar entre 1 y 100.");
            avisosUsuario("red","El descuento debe estar entre 1 y 100");
            return;
        }

        try {
            await addDoc(collection(db, "cupones"), {
                codigo,
                descuento: Number(descuento),
            });

            setCodigo("");
            setDescuento("");
            await obtenerCupones();

        } catch (error) {
            console.error(error);
            //alert("Error al crear el cupón.");
            avisosUsuario("red","Error descuento debe estar entre 1 y 100");
        }
    };

    // Eliminar cupón
    const eliminarCupon = async (id) => {
        try {
            await deleteDoc(doc(db, "cupones", id));
            await obtenerCupones();
        } catch (error) {
            console.error(error);
            avisosUsuario("red","Error al eliminar el cupón");
            //alert("Error al eliminar el cupón.");
        }
    };

    return (
        <div className={styles.main}>
            <h2 className={styles.h2}>Administración de Cupones</h2>
            <form className={styles.form} onSubmit={crearCupon}>
                <input type="text" placeholder="Código" required value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                <input type="number" placeholder="Desc %" min="1" max="100" required value={descuento} onChange={(e) => setDescuento(e.target.value)} />
                <button type="submit">Crear Cupón</button>
                <div className={styles.errorField} style={{ color: campoError[0]}}>{campoError[1]}</div>
            </form>
            
            <h3 className={styles.h3}>Listado de Cupones</h3>
            {
                cupones.map((cupon) => (
                    <div className={styles.divItem} key={cupon.id}>
                        <p> <strong>Código:</strong> {cupon.codigo} </p>
                        <p> <strong>Descuento:</strong> {cupon.descuento}% </p>
                        <button onClick={() => eliminarCupon(cupon.id)}>
                            Eliminar
                        </button>
                    </div>
                ))
            }
        </div>
    );
};

export default GestionCupones;