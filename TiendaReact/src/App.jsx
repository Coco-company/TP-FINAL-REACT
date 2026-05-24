import './App.css'

import {FormularioContainer} from './componentes/FormularioContainer/FormularioContainer';
import Layout from "./componentes/Layout/Layout.jsx";
import { Routes, Route } from 'react-router-dom'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer.jsx';
import ProductoDetalle from './componentes/ProductoDetalle/ProductoDetalle.jsx';
import Home from './componentes/Home/Home.jsx';
//*import Carrito from './';

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/Productos' element={<ItemListContainer />} />
        <Route path='/alta' element={<FormularioContainer />} />
        <Route path='/Producto/:id' element={<ProductoDetalle />} />
        <Route path='/Carrito' element={<ProductoDetalle />} />
      </Route>
    </Routes>
  );
}

export default App;


