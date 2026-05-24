import styles from './Home.module.css';
import OfertasListContainer from './OfertasListContainer/OfertasListContainer.jsx';

function Home() {
    return (
        <div className={styles.divHome}>
            <h1>OFERTAS!</h1>
            <OfertasListContainer/>
        </div>    
    );
}

export default Home;