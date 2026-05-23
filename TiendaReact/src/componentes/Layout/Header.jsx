import styles from './Header.module.css';
import { NavBar} from './NavBar';

function Header(){
    return(
        <>
        <header className={styles.header}>
            <h1>Buena Impresión</h1>
            <h2>Insumos para creadores 3D</h2>
        </header>
        <NavBar />
        </>
    );
}

export default Header;