import { Link } from 'react-router-dom';
import { nav, ul, li, usuario } from './NavBar.module.css';
import { useCart } from '../Carrito/useCart.jsx';
import { useAuth } from '../../context/useAuth.jsx';


export const NavBar = () => {
    const { user, logout } = useAuth(); //agregamos los datos de autenticación
    const { getCartQuantity } = useCart();
    
    const totalItems = getCartQuantity();
    
    return (
        <nav className={nav}>
            {user ? (
                <p className={usuario} >¡Bienvenido, {user.name}! <button onClick={logout}>Cerrar Sesión</button></p>
            ) : <></>
            }
            <ul className={ul}>
                <li className={li}><Link to="/">Home</Link></li>
                <li className={li}><Link to="/Productos">Productos</Link></li>
                
                <li className={li}><Link to="/Carrito">Carrito {totalItems > 0 && <div><span>{totalItems}</span></div>}</Link></li>
                {user ? (
                    <>
                        {user.rol === 'admin' && (
                            <>
                                <li className={li}><Link to="/Gestion">Gestión Productos</Link></li>
                                <li className={li}><Link to="/Cupones">Gestión Cupones</Link> </li>
                            </>
                        )}
                    </>
                ) : (
                    <li className={li}><Link to="/Login">Login</Link></li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar;