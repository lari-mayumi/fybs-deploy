//import '../App.css';
import React, { useState } from "react";
import Axios from "axios";
import "./Login.modules.css";
import Globais from "./Globais";
import { Link, useNavigate } from 'react-router-dom';
import NavbarInicial from "./layout/NavbarInicial";


function Login(){
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState();
  const [senha, setSenha] = useState();
  const [caminho, setCaminho] = useState();

  const navigate = useNavigate();
  localStorage.setItem("id", 0);
  localStorage.setItem("login", 0);

  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      console.log(userList);
      setUserList(response.data);
    });
    //console.log(userList)
    let i=0;
    while (i < userList.length) {
      console.log(userList[i].nome, userList[i].id)
      if (userList[i].nome === name && userList[i].senha === senha) { //está duplicando os users e precisa clicar duas vezes no botão pra logar, na primeira da erro
        console.log("Achei:", name, senha); //não está entrando no if, feed não carrega pq id continua zerado
        localStorage.setItem("id", userList[i].id);
        localStorage.setItem("login", 1);
      }
      i = i + 1;  
    }
    //console.log(parseInt(localStorage.getItem("id")))
    if (parseInt(localStorage.getItem("login")) === 1) {
      //ir para o feed
      localStorage.setItem("userName", name);
      navigate("/feed");
      console.log("entrando")
      console.log(parseInt(localStorage.getItem("id")))
    }
    else {
      console.log("Usuário ou senha inválidos."); //fazer popup para mostrar isso
    }
  };
  
  return(
    /**
     * HTML referente a página de Login a função esta retornando o componente, mas 
     * na verdadde ele está sendo referenciado em index.html como um root
     */
    
    <div>
        < NavbarInicial />

        <div className="modal modal-signin position-static d-block bg-secondary py-5" tabindex="-1" role="dialog" id="modalSignin">
          <div className="modal-dialog" role="document">
            <div className="modal-content rounded-5 shadow">
              <div className="modal-header p-5 pb-4 border-bottom-0"></div>

              <div className="modal-body p-5 pt-0">
                <form className="">
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-4" id="floatingInput" placeholder="name@example.com"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}/>
                    <label for="floatingInput">Usuário</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control rounded-4" id="floatingPassword" placeholder="Password"
                      onChange={(event) => {
                        setSenha(event.target.value);
                      }}/>
                    <label for="floatingPassword">Senha</label>
                  </div>
                  <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit" onClick={getUsers}>Entrar</button>
                  <hr className="my-4"/>
                    <h2 className="fs-5 fw-bold mb-3"> Ou use uma de suas contas</h2>
                  <button className="w-100 py-2 mb-2 btn btn-outline-dark rounded-4" type="submit">
                    <svg className="bi me-1" width="16" height="16"><use href="#"/></svg>
                    Entrar com Twitter
                  </button>
                  <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-4" type="submit">
                    <svg className="bi me-1" width="16" height="16"><use href="#"/></svg>
                    Entrar com Facebook
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Login;