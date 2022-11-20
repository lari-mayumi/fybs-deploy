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

import { initializeApp } from "firebase/app";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCNEcLbT4i_zCEXfOtkBhV9b0x7lrDBAYw",
  authDomain: "fybs-teste-firebase.firebaseapp.com",
  projectId: "fybs-teste-firebase",
  storageBucket: "fybs-teste-firebase.appspot.com",
  messagingSenderId: "212862553160",
  appId: "1:212862553160:web:af7ffab852a31d7263dc7d"
});

function App() {
  localStorage.setItem("erro", 0);
  
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