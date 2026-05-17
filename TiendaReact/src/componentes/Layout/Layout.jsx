import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from 'react-router-dom'; //* Importamos outlet
//* Todo lo que pongamos dentro de Layout en app.js será el "Children".


function Layout({children}){    
    return (
        <>
            <Header/>
            <main>
                //*{children}   {/* Children = Muestra los componentes contenidos dentro del elemento HTML */}
                //* Aqui se renderizará el componente de la ruta activa
                <Outlet/>
            </main>
            <Footer/>
        </>
    );   
} 

export default Layout;