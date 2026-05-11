import {header, h1} from './Header.module.css';

function Header(){
    return(
        <header className={header}>
            <h1 className={h1}>Bienvenidos a mi Aplicación React</h1>
        </header>
    );
}

export default Header;