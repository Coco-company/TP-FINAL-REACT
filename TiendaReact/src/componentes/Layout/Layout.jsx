import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function Layout({children}){    
    return (
        <div>
            <Header/>
            <main>
                   {children}   {/* Children = Muestra los componentes contenidos dentro del elemento HTML */}
            </main>
            <Footer/>
        </div>
    );   
}

export default Layout;