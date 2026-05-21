import './App.css'

//* import {contador} from './componentes/Contador/Contador';
//* import Productos from './componentes/Productos/Productos';
import {FormularioContainer} from './componentes/FormularioContainer/FormularioContainer';

import Asistentes from "./componentes/Asistentes/Asistentes.jsx";
import Perfil from "./componentes/Perfil/Perfil.jsx";
import Layout from "./componentes/Layout/Layout.jsx";
import { Routes, Route } from 'react-router-dom'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer.jsx';
import ProductoDetalle from './componentes/ProductoDetalle/ProductoDetalle.jsx';

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<h1>Pagina de Inicio</h1>} />
        <Route path='/Productos' element={<ItemListContainer />} />
        <Route path='/alta' element={<FormularioContainer />} />
        <Route path='/Producto/:id' element={<ProductoDetalle />} />
      </Route>
    </Routes>
  );
}

export default App;