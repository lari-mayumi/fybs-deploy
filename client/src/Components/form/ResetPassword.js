//import '../App.css';
import React, { useState } from "react";
import Axios from "axios";
import "./ResetPassword.modules.css";
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword(){

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
     * HTML referente a página de ResetSenha a função esta retornando o componente, mas 
     * na verdadde ele está sendo referenciado em index.html como um root
     */
    
    <div>
      <div className="limiter-reset-senha">
          <div className="container-reset-senha">
            <div className="utility-reset-senha p-l-55 p-r-55 p-t-65 p-b-54">
              <form className="form-reset-senha validate-form">
                <span className="form-title-reset-senha p-b-49">
                  Recuperar senha
                </span>

                <div className="input-reset-senha validate-input m-b-23" data-validate = "Campo vazio!">
                  <span className="label-reset-senha">Nova senha</span>
                  <input className="input-form-reset-senha" type="password" name="reset" placeholder="Insira sua nova senha"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}/>
                  <span className="icon-form-reset-senha" data-symbol></span>
                </div>

                <div className="input-reset-senha validate-input" data-validate="Senhas não conferem!">
                  <span className="label-reset-senha">Repita a senha</span>
                  <input className="input-form-reset-senha" type="password" name="new" placeholder="Repita sua nova senha"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}/>
                  <span className="icon-form-reset-senha" data-symbol></span>
                </div>
                
                <div className=".container-form-btn-reset-senha">
                  <div className="form-btn-reset-senha">
                    <div className="form-bgbtn-reset-senha"></div>
                    <button className="layout-btn-reset-senha" onClick={getUsers}>
                      Confirmar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
	      </div>
	
      <div id="dropDownSelect1"></div>
    </div>
  );
}

export default ResetPassword;