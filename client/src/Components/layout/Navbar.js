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

    Axios.get("http://localhost:3001/users").then((response) => { 
          setPerfil(response.data);
    });
    let i = 0;
    while (i < perfil.length){   
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
        navigate("/perfil");
    }

    const buscar = () => {
        let b = busca.replaceAll(" ", "+")
        navigate("/search/" + b);
    }

    return (
        <>
            {/**menu feito anteriormente*/}
            <nav className="navbar">
                <div className='headerMenu'>
                    {/** Logo Fybs">*/}
                    <div className="logoMenu">
                        <button className='button' onClick={navegarFeed}>
                            <img className="image" src={logo} alt="fybs" />
                        </button>
                    </div>
                    {/** Foto do perfil ">*/}
                    <div className='perfilMenu'>
                        <button className="button" onClick={verPerfil}> <img class="profile-pic mr-3" src={fotoPerfil} /> </button>
                        <select name="@fybs" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                    {/** Campo de busca ">*/}
                    <div className="searchMenu">
                        <form>
                            <input type="text" className="txtBusca" placeholder='Busque na Fybs...' onChange={(event) => {
                        setBusca(event.target.value);
                      }}/>
                        </form>
                        <button className='button' onClick={buscar}><img src={iconeLupa} className="btnBusca" alt='fybs' /></button>
                        {/* busca && < Busca key={busca} />*/}
                    </div>
                    {/** Botão de sair ">*/}
                    <div className="exit">
                        <Link to="/" onClick={logout}>
                            <img className="btnSair" onClick={logout} src={iconeSair} alt="fybs" />
                        </Link>
                    </div>
                </div>

            </nav>
        </>
    );
}

export default Navbar;
