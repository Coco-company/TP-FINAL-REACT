import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from "./componentes/Layout/Layout.jsx";
import Home from './componentes/Home/Home.jsx';
import Gestion from './componentes/Gestion/Gestion.jsx';
import ItemListContainer from './componentes/Productos/ItemListContainerDB/ItemListContainer.jsx';
import ProductosNacionales from './componentes/ProductosNacionales.jsx';
import ProductosNacionalesDetalle from './componentes/ProductosNacionalesDetalle.jsx';
import ProductoDetalle from './componentes/Productos/ProductoDetalle/ProductoDetalle.jsx';
import {FormularioProducto} from './componentes/Alta/FormularioProducto/FormularioProducto.jsx';
import Cart from './componentes/Carrito/Cart.jsx';


//*import Carrito from './';

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/Productos' element={<ItemListContainer Mensaje={"Nuestros productos"} />} />
        <Route path='/Producto/:id' element={<ProductoDetalle />} />
        <Route path='/Gestion' element={<Gestion />} />
        <Route path='/Carrito' element={<Cart />} />
        {/* <Route path="/productosBD" element={<ProductosBD />} /> */}
      </Route>
    </Routes>
  );
}

export default App;