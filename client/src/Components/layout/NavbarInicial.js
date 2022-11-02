import {Link} from 'react-router-dom'
import "./Navbar.modules.css";
import logo from '../../img/logo.png'
import Globais from '../Globais';
import React from 'react';

function NavbarInicial(){
    const logout = () =>{
        Globais.login = 0;
    }

    return (
    <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand"><img src={logo}/></a>
                <form class="d-flex">
                    <button class="btn btn-outline-success" type="submit">
                        <a class="nav-link" href="/cadastrar">
                            <span data-feather="file"></span>
                            Criar conta
                        </a>
                    </button>
                </form>
            </div>
        </nav> 
    </div>     
    );
}

export default NavbarInicial;