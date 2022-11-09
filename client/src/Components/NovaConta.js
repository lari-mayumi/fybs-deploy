import { useState } from "react";
import Axios from 'axios';
import "./NovaConta.modules.css"
import { Link, useNavigate } from 'react-router-dom';
import Footer from "./layout/Footer";
import Container from './layout/Container';
import logo from '../img/logo.png'

function NovaConta(){

    const [name, setName] = useState();   
    const [nome, setNome] = useState();   
    const [email, setEmail] = useState();
    const [idade, setIdade] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [perfil, setPerfil] = useState([]);
    //let idade = 0;

    const navigate = useNavigate;
    
    const cadastrarUsuario = async e => {
        e.preventDefault();

        Axios.get("http://localhost:3001/users").then((response) => { //pega os dados do backend
        setPerfil(response.data);
        });

        if (idade < 13 ){
            //pop up não pode criar conta
            console.log("menor que 13")
            navigate("/");
        }

        let i = 0;
        while (i < perfil.length){    //encontra os dados através do user conectado
            console.log(name, perfil[i].nome)
            if (name === perfil[i].nome) {
                //pop up já existe o user
                console.log("já tem esse user")
                navigate("/cadastrar");
            }
            else if (email === perfil[i].email) {
                //pop up email já cadastrado
                console.log("já tem esse email")
                navigate("/cadastrar");
            }
            i = i + 1;
         } 
        if (password !== password2){
            console.log("Senhas não conferem.") //criar algum popup que exiba mensagem de "Senhas não conferem" e de "Conta criada com sucesso"
        }
        else {/*
            Axios.post("http://localhost:3001/createaccount", { //essa função envia os dados para o backend
                name: name,
                email: email,
                password: password,

            }).then(() => {
                console.log("success");
            }); 
            navigate("/feed");*/
        }

    };

    return(
        <div>
        <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins">
            <div className="wrapper wrapper--w1030">
                <div className="card card-3">
                    <div className="card-heading"></div>
                    <div className="card-body">
                        <h2 className="title">Crie sua conta na Fybs!</h2>
                        <form method="POST">
                            <div className="input-group">
                                <span className="label-input100">Username</span>
                                <input className="input--style-3" type="text" name="name"
                                    onChange={(event) => {
                                    setName(event.target.value);
                                    }}/>
                            </div>
                            <div className="input-group">
                                <span className="label-input100">Nome</span>
                                <input className="input--style-3" type="text" name="name"                                    
                                    onChange={(event) => {
                                    setNome(event.target.value);
                                    }}/>
                            </div>
                            <div className="input-group">
                                <span className="label-input100">Data de Nascimento</span>
                                <input className="input--style-3 js-datepicker" type="text" name="birthday"                                  
                                    onChange={(event) => {
                                    setIdade(event.target.value);
                                    }}/>
                                <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                            </div>
                            <div className="input-group">
                            <span className="label-input100">E-mail</span>
                                <input className="input--style-3" type="email" name="email"
                                    onChange={(event) => {
                                    setEmail(event.target.value);
                                    }}/>
                            </div>
                            <div className="input-group">
                                <span className="label-input100">Senha</span>
                                <input className="input--style-3" type="password" name="phone"                                    
                                onChange={(event) => {
                                setPassword(event.target.value);
                                }}/>
                            </div>
                            <div className="input-group">
                                <span className="label-input100">Repita a senha</span>
                                <input className="input--style-3" type="password" name="phone"
                                    onChange={(event) => {
                                    setPassword2(event.target.value);
                                    }}/>
                            </div>
                            <div className="p-t-10">
                                <button className="btn btn--pill btn--purple" type="submit" onClick={cadastrarUsuario}>Criar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default NovaConta;
