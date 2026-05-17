import {header, h1} from './Header.module.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <>
        <header className={header}>
            <h1 className={h1}>Bienvenidos a mi Aplicación React</h1>
        </header>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to='/Productos'>Productos</Link></li>
                <li><Link to='/alta'>Alta Producto</Link></li>
                <li><Link to='/Carrito'>Carrito</Link></li>
            </ul>
        </nav>
        </>
    );
}

export default Header;