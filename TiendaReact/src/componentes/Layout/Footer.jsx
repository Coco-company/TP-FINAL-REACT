import TarjetaListaCont from './TarjetaListaCont/TarjetaListaCont.jsx';
import style from './Footer.module.css';

function Footer(){
    
    return (
        <footer style={{ backgroundColor: 'yellow', padding: '10px', textAlign: 'center', margin:'15px 0px 10px', color: 'black'}}>
            <h2 className={style.h2}>Nuestro Staff</h2>
            <TarjetaListaCont/>
        </footer>
    )
}

export default Footer;