import { useState } from "react";
import Axios from 'axios';
import "./NovaConta.modules.css"
import { Link, useNavigate } from 'react-router-dom';
import Footer from "./layout/Footer";
import Container from './layout/Container';
import logo from '../img/logo.png'

function NovaConta(){

    const [name, setName] = useState();    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();

    const navigate = useNavigate;
    
    const cadastrarUsuario = () => {
        if (password !== password2){
            console.log("Senhas não conferem.") //criar algum popup que exiba mensagem de "Senhas não conferem" e de "Conta criada com sucesso"
        }
        else {
            Axios.post("http://localhost:3001/createaccount", { //essa função envia os dados para o backend
                name: name,
                email: email,
                password: password,

            }).then(() => {
                console.log("success");
            }); 
            navigate("/feed");
        }

    };

    return(
        <div className="form_control">
            
          <nav className="navbar">
              <Container>
                  <Link to="/">
                      <img src={logo} alt="fybs" />
                  </Link>
                  <ul className="list">
                  <li className="item">
                    <Link to="/">Login</Link>
                  </li>
                  </ul>
              </Container>
          </nav>
            <h1>Crie sua conta na Fybs!</h1>
            <form> 
                <div>
                    <label>Nome</label>
                    <input
                    type="text"
                    text="Nome"
                    name="name"
                    placeholder="Digite seu nome aqui"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    /> 
                </div>
                <div>
                <label>Email</label>
                <input 
                    type="text"
                    text="Email"
                    name="email"
                    placeholder="Insira seu Email"
                    onChange={(e) => setEmail(e.target.value)}
                /> 
                </div>
                <div>
                <label>Senha</label>
                <input 
                    type="password"
                    text="Senha"
                    name="senha"
                    placeholder="Insira a senha"
                    onChange={(e) => setPassword(e.target.value)}
                 />
                </div>
                <div>
                <label>Repita a senha</label>
                <input 
                    type="password"
                    text="Repita a senha"
                    name="senha2"
                    placeholder="Insira a senha"
                    onChange={(e) => setPassword2(e.target.value)}
                 />
                </div>

                <div>
                    <button className="btn" onClick={cadastrarUsuario}>Cadastrar</button>
                </div>         
            </form>
            < Footer />
        </div>
    )
}

export default NovaConta;
