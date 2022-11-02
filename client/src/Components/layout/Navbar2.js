import {Link} from 'react-router-dom'
import Container from './Container';
import "./Navbar2.modules.css";
import logo from '../../img/logo.png'
import Globais from '../Globais';

// NAO MEXER NAVBAR DE TESTE

function Navbar(){
    const logout = () =>{
        localStorage.setItem("id", 0);
        localStorage.setItem("login", 0);
    }

    return (
    <nav className="navbar">
        <div>
            <Link to="/">
                <img className="image" src={logo} alt="fybs" />
            </Link>
            <ul className="list">
                <li className="item">
                    <Link to="/feed">Feed</Link>
                </li>
                <li className="item">
                    <Link to="/perfil">Perfil</Link>
                </li>
                <li className="item">
                    <Link to="/grupos/lol">Grupos</Link>
                </li>
                <li className="item">
                    <Link to="/" onClick={logout}>Logout</Link>
                </li>
            </ul>
        </div>
    </nav>
    )
}

export default Navbar;