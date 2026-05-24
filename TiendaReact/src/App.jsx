import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from "./componentes/Layout/Layout.jsx";
import Home from './componentes/Home/Home.jsx';
import ItemListContainer from './componentes/Productos/ItemListContainer/ItemListContainer.jsx';
import ProductoDetalle from './componentes/Productos/ProductoDetalle/ProductoDetalle.jsx';
import {FormularioContainer} from './componentes/Alta/FormularioContainer/FormularioContainer';
import CarroContainer from './componentes/Carrito/ItemCarroListContainer/ItemCarroListContainer.jsx'

//*import Carrito from './';

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/Productos' element={<ItemListContainer />} />
        <Route path='/alta' element={<FormularioContainer />} />
        <Route path='/Producto/:id' element={<ProductoDetalle />} />
        <Route path='/Carrito' element={<CarroContainer />} />
      </Route>
    </Routes>
  );
}

export default App;