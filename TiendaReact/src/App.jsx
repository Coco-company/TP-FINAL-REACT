import './App.css'

//* import {contador} from './componentes/Contador/Contador';
//* import Productos from './componentes/Productos/Productos';
import {FormularioContainer} from './componentes/FormularioContainer/FormularioContainer';

import Asistentes from "./componentes/Asistentes/Asistentes.jsx";
import Perfil from "./componentes/Perfil/Perfil.jsx";
import Layout from "./componentes/Layout/Layout.jsx";
import { Routes, Route } from 'react-router-dom'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer.jsx';

const asistentes = [
  {nombre: 'Juan Perez', tareas: 'Frontend Developer', emoji: '💻'},
  {nombre: 'Ana Gomez', tareas: 'Diseñadora UX/UI', emoji: '🎨'},
  {nombre: 'Carlos Ruiz', tareas: 'Backend Developer', emoji: '👨‍💻'}
];

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<h1>Pagina de Inicio</h1>} />
        <Route path='/Productos' element={<ItemListContainer />} />
        <Route path='/alta' element={<FormularioContainer />} />
      </Route>
    </Routes>
  );
}

export default App
