import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import NovaConta from './NovaConta';
import Login from './Login';
import Feed from './Feed';
import NewPost from './form/NewPost';
import Perfil from './Perfil';
import PerfilAlterar from './PerfilAlterar';
import VerPerfil from './VerPerfil';
import Globais from './Globais';
import Grupos from './Grupos';
import Busca from './Busca';

function Rotas(){/*
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
       {...rest} 
       render={props => 
        Globais.login = 1 ? (
          <Component {...props} />
        ) : (
          //<Redirect to={{ pathname: '/', state: { from: props.location } }} />
          console.log("Vai entrar n")
        
         )
      }
    />
    );*/
    //let id = parseInt(localStorage.getItem("id"));

    return(
      < div >
        <Routes>
        <Route exact path="/" element={< Login />} />
        <Route exact path="/cadastrar" element={< NovaConta />} />
        <Route exact path="/feed" element={< Feed />} />
        <Route exact path="/feed/post" element={< NewPost />} />
        <Route exact path="/perfil" element={< Perfil user={parseInt(localStorage.getItem("id"))} />} />
        <Route exact path="/verperfil/:user" element={< VerPerfil />} />
        <Route exact path="/alterarperfil" element={< PerfilAlterar />} />
        <Route exact path="/grupos/:group" element={< Grupos />} />
        <Route exact path="/search/:key" element={< Busca />} />
       
        </Routes>
      </ div >
    )
}

export default Rotas;

//<PrivateRoute exact path="/feed" element={< Feed />} />

//<Route exact path="/account" element={< Perfil2 user={Globais.user2}/>} />
