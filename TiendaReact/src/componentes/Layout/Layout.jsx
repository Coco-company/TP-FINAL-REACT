import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

function Layout({children}){    
    return (
        <div>
            <Header/>
                {children}   {/* Children = Muestra los componentes contenidos dentro del elemento HTML */}
            <Footer/>
        </div>
    );   
}

export default Layout;