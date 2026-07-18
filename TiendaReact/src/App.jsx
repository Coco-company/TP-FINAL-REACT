import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from "./componentes/Layout/Layout.jsx";
import Home from './componentes/Home/Home.jsx';
import Gestion from './componentes/Gestion/Gestion.jsx';
import ItemListContainer from './componentes/Productos/ItemListContainerDB/ItemListContainer.jsx';
import ProductoDetalle from './componentes/Productos/ProductoDetalle/ProductoDetalle.jsx';
import Cart from './componentes/Carrito/Cart.jsx';
import Login from './componentes/Login/Login';
import GestionCupones from "./componentes/GestionCupones/GestionCupones";
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute';
import Registro from './componentes/Login/Registro.jsx';

//*import Carrito from './';

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/Productos' element={<ItemListContainer Mensaje={"Nuestros productos"} />} />
        <Route path='/Producto/:id' element={<ProductoDetalle />} />
        <Route path='/Gestion' element={
          <ProtectedRoute rolesPermitidos={["admin"]}>
            <Gestion/>
          </ProtectedRoute>
          } />
        <Route path="/Cupones" element={
          <ProtectedRoute rolesPermitidos={["admin"]}>
            <GestionCupones/>
          </ProtectedRoute>
          } />
        <Route path='/Carrito' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        {/* <Route path="/productosBD" element={<ProductosBD />} /> */}
      </Route>
    </Routes>
  );
}

export default App;