import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Post from './Components/Post';
import NovaConta from './Components/NovaConta';
import Login from './Components/Login';
import Feed from './Components/Feed';
import Container from './Components/layout/Container';
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import NewPost from './Components/form/NewPost';
import Perfil from './Components/Perfil';
import PerfilAlterar from './Components/PerfilAlterar';
import Rotas from './Components/Rotas'

function App() {
  return (
    <Router>
      <Container className="Container">
        <Rotas />
      </Container>
    </Router>
  );
}

export default App;
/** 
 *         <Post user="@Stezinha" texto="Fofoca? Aceito!"/>
          
          <Post user="@Lari" texto="Sushi fofinho"/>
          
          <Post user="@Mandita" texto="Edward seu lindo"/>
          
          <Post user="@Tate" texto="vo dar paulada"/>
*/