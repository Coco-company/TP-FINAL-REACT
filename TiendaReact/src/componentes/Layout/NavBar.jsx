import React from 'react';
import { Link } from 'react-router-dom';
import { nav, ul, li } from './NavBar.module.css';
import { useCart } from '../Carrito/useCart.jsx';

export const NavBar = () => {

    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    return (
        <nav className={nav}>
            <ul className={ul}>
                <li className={li}><Link to="/">Home</Link></li>
                <li className={li}><Link to="/Productos">Productos</Link></li>
                <li className={li}><Link to="/Gestion">Gestión de Productos</Link></li>
                <li className={li}><Link to="/admin/cupones"> Gestión de Cupones</Link> </li>
                <li className={li}><Link to="/Carrito">Carrito {totalItems > 0 && <div><span>{totalItems}</span></div>}</Link></li>
            </ul>
        </nav>
    )
}