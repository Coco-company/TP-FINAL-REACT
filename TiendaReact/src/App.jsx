import './App.css'
import Asistentes from "./componentes/Asistentes/Asistentes.jsx";
import Perfil from "./componentes/Perfil/Perfil.jsx";
import Layout from "./componentes/Layout/Layout.jsx";
import ItemContainer from "./componentes/item/ItemContainer.jsx";
import ItemList from './componentes/item/ItemList.jsx';

const asistentes = [
  {nombre: 'Juan Perez', tareas: 'Frontend Developer', emoji: '💻'},
  {nombre: 'Ana Gomez', tareas: 'Diseñadora UX/UI', emoji: '🎨'},
  {nombre: 'Carlos Ruiz', tareas: 'Backend Developer', emoji: '👨‍💻'}
];

function App() {

  return (
    <Layout>
      <Perfil/>
      <Asistentes asistProp={asistentes}/>
      <ItemContainer>
        <ItemList/>
      </ItemContainer>
    </Layout>
  );
}

export default App
