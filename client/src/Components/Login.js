//import '../App.css';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Login.modules.css";
import Globais from "./Globais";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../img/logo - Copia.png"
import resetSenha from "./form/ResetPassword";
import Modal from "./ModalErroLogin";
import {initializeApp} from "firebase/app";
import {getFirestore, getDocs, collection} from "firebase/firestore";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCNEcLbT4i_zCEXfOtkBhV9b0x7lrDBAYw",
  authDomain: "fybs-teste-firebase.firebaseapp.com",
  projectId: "fybs-teste-firebase",
  storageBucket: "fybs-teste-firebase.appspot.com",
  messagingSenderId: "212862553160",
  appId: "1:212862553160:web:af7ffab852a31d7263dc7d"
});

function Login(){
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState();
  const [senha, setSenha] = useState();
  const [caminho, setCaminho] = useState();
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  localStorage.setItem("id", 0);
  localStorage.setItem("login", 0);
  let erro = parseInt(localStorage.getItem("erro"));

  const db = getFirestore(firebaseConfig);
  const userCollectionRef = collection(db, "usuarios");

  Axios.get("http://localhost:3001/users").then((response) => {
    setUserList(response.data);
  });

  useEffect(() => {

    const getUsers = async e => {
      e.preventDefault();
      const data = await getDocs(userCollectionRef);
  
      //clickLogin = 1;
      //console.log(userList)
      let i=0;
      while (i < userList.length) {
        console.log(userList[i].nome, userList[i].id)
        if (userList[i].nome === name && userList[i].senha === senha) { 
          console.log("Achei:", name, senha); 
          localStorage.setItem("id", userList[i].id);
          localStorage.setItem("login", 1);
        }
        i = i + 1;  
      }
      
      if (parseInt(localStorage.getItem("login")) === 1) { //ir para o feed
        localStorage.setItem("userName", name);
        navigate("/feed");
        console.log("entrando")
        //console.log(parseInt(localStorage.getItem("id")))
      }
      else {
        localStorage.setItem("erro", 1);
        console.log("Usuário ou senha inválidos."); //fazer popup para mostrar isso
      }
    }
    getUsers();
  },[])  

  const recuperarSenha = () => {
    navigate("/resetSenha")
  }
  //console.log(erro)
  return(
    /**
     * HTML referente a página de Login a função esta retornando o componente, mas 
     * na verdadde ele está sendo referenciado em index.html como um root
     */
    
    <div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              <form className="login100-form validate-form">
                <span className="login100-form-title p-b-49">
                  <img src={logo}/>
                </span>
                { erro === 1 && < Modal />}
                <div className="wrap-input100 validate-input m-b-23" data-validate = "Username ou e-mail necessário!">
                  <span className="label-input100">Username</span>
                  <input className="input100" type="text" name="username" placeholder="Insira seu username ou e-mail"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}/>
                  <span className="focus-input100" data-symbol></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Senha necessário!">
                  <span className="label-input100">Senha</span>
                  <input className="input100" type="password" name="pass" placeholder="Insira sua senha"
                    onChange={(event) => {
                      setSenha(event.target.value);
                    }}/>
                  <span className="focus-input101" data-symbol></span>
                </div>
                
                <div className="text-right p-t-8 p-b-31">
                  <a href="#" onClick={recuperarSenha}>
                    Esqueceu a senha?
                  </a>
                </div>
                
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    {/* <button className="login100-form-btn" onClick={getUsers}> */}
                    <button className="login100-form-btn" onClick={useEffect}>
                      Entrar
                    </button>
                  </div>
                </div>

                {/*
                <div className="txt1 text-center p-t-54 p-b-20">
                  <span>
                    Ou entre com uma de suas contas:
                  </span>
                </div>

                <div className="flex-c-m">
                  <a href="#" className="network-social-item bg1">
                    <i className="fa fa-facebook"></i>
                  </a>
                    
                  <a href="#" className="network-social-item bg2">
                    <i className="fa fa-twitter"></i>
                  </a>

                  <a href="#" className="network-social-item bg3">
                    <i className="fa fa-google"></i>
                  </a>
                </div>*/
}
                <div className="flex-col-c p-t-155">
                  <span className="txt1 p-b-17">
                    Ainda não tem conta? 
                  </span>

                  <a href="/cadastrar" className="txt2">
                    Cadastre-se
                  </a>
                </div>
              </form>
            </div>
          </div>
	      </div>
	
      <div id="dropDownSelect1"></div>
    </div>
  );
}

export default Login;