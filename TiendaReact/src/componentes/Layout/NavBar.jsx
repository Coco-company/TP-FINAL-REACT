import React from 'react';
import { Link } from 'react-router-dom';
import {nav, ul, li} from './NavBar.module.css';
import { useCart } from '../../componentes/Carrito/CartContext';

const { getCartQuantity } = useCart();
const totalItems = getCartQuantity();

export const NavBar = () => {
    return(
        <nav className={nav}>
            <ul className={ul}>
                <li className={li}><Link to="/">Home</Link></li>
                <li className={li}><Link to='/Productos'>Productos</Link></li>
                <li className={li}><Link to='/alta'>Alta Producto</Link></li>
                <li className={li}><Link to='/Carrito'>Carrito {totalItems > 0 && <span>{ totalItems }</span>}</Link></li>
            </ul>
        </nav>
    )
}