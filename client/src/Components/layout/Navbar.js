import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.modules.css";
import logo from '../../img/logo.png'
import Globais from '../Globais';
import React from 'react';
import NovaConta from '../NovaConta';
import iconeLupa from '../../img/iconeLupa.png'
import iconeSair from '../../img/iconeLogout.png'
import fotoPerfil from '../../img/user2.png'
import { useState } from "react";
import Axios from "axios";
import Busca from '../Busca';

//navbar do feed

function Navbar() {
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState([]);
    const [busca, setBusca] = useState();
    let id = parseInt(localStorage.getItem("id"));
    let fotoPerfil = "";

    //Show/hide pop confirmar sair
    //var boxS = document.getElementById("boxS");
    //var showMenu = document.getElementById("showMenu");
    //var hideMenu = document.getElementById("hideMenu");
    //showMenu.addEventListener("click", function () {
    //    boxS.classList.add("show");
    //});

    //hideMenu.addEventListener("click", function () {
    //    boxS.classList.remove("show");
    //});

    Axios.get("http://localhost:3001/users").then((response) => {
        setPerfil(response.data);
    });
    let i = 0;
    while (i < perfil.length) {
        if (id === perfil[i].id) {
            fotoPerfil = perfil[i].foto;
        }
        i = i + 1;
    }

    const logout = () => {
        localStorage.setItem("login", 0);

        localStorage.setItem("id", 0);
        console.log(parseInt(localStorage.getItem("login")))
        console.log(parseInt(localStorage.getItem("id")))
    }

    const navegarFeed = () => {
        navigate("/feed");
    }

    const verPerfil = () => {
        localStorage.setItem("perfil", 1);
        //navigate("/perfil");
    }

    const buscar = () => {
        let b = busca.replaceAll(" ", "+")
        navigate("/search/" + b);
    }

    return (
        <>
            <nav className="navbar">
                <div className="navPrincipal">
                    {/* Logo */}
                    <div className="logo">
                        <button className='button' onClick={navegarFeed}>
                            <img className="image" src={logo} alt="fybs" />
                        </button>
                    </div>
                    {/* Foto Perfil */}
                    <div className="logoPerfil">
                        <button className="btnPerfil" onClick={verPerfil}>
                            <img className="imgPerfil" src={fotoPerfil} />
                        </button>
                    </div>
                    {/* Busca */}
                    <div className="busca">
                        <form>
                            <input type="text" className="txtBusca" placeholder='Busque na Fybs...' onChange={(event) => {
                                setBusca(event.target.value);
                            }} />
                        </form>
                        <button className='btnBusca' onClick={buscar}>
                            <img src={iconeLupa} className="imgBusca" alt='fybs' />
                        </button>
                    </div>
                    {/* Sair */}
                    <div className="deslogar">
                        <Link to="/" onClick={logout}>
                            <img className="btnSair" onClick={logout} src={iconeSair} alt="fybs" />
                        </Link>
                    </div>
                </div>
                {/* Sub-menu */}
                <div className="navSecundaria">
                    <ul className="menuS">
                        <li><a href="#">Meu Perfil</a></li>
                        <li><a href="#">Grupos </a></li>
                        <li><a href="#">Descubra</a></li>
                        <li><a href="#">Validar esse menu -- realemnte necessario?</a></li>
                    </ul>
                </div>
            </nav>
            {/* Pop-up confirmação de logout */}
            <div className="popupSair">
                <div className="caixaSair">
                    <div className="tituloSair">
                        <p> Sair da Fybs?</p>
                    </div>
                    <div className="corpoSair">
                        <p> Você tem certeza que deseja deslogar da sua conta agora? </p>
                    </div>
                    <div className="caixaSairConfirma">
                        <button className="btnSairConfirma">
                            <p>Sim</p>
                        </button>
                        <button className="btnVoltarConfirma">
                            <p>Não</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
