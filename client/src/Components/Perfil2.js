import { useState } from "react";
import "./Perfil.modules.css";
import Axios from "axios";
import { Link } from 'react-router-dom';
import Globais from "./Globais";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function Perfil2({user}){

    const [userName, setUserName] = useState(user);
    let email = "";
    let descricao = "";
    
    let seguidores = 0;
    let seguindo = 0;
    
    const [perfil, setPerfil] = useState([]);
    const [followers, setFollowers] = useState([]);

    const getProfile = () => {
        Axios.get("http://localhost:3001/users").then((response) => { //pega os dados do backend
            //console.log(response.data);
          setPerfil(response.data);
        });
        console.log(userName, email, descricao);
        let i = 0;
        while (i < perfil.length){    //encontra os dados através do user conectado
            if (userName === perfil[i].nome) {
                //console.log("achei")
                descricao = perfil[i].descricao;
                email = perfil[i].email;
                i = perfil.length;
            }
            i = i + 1;
         } 

         Axios.get("http://localhost:3001/followers").then((response) => { //pega os dados do backend
            setFollowers(response.data);
        });

        i = 0;
        while (i < followers.length){    //encontra os dados através do user conectado
            if (userName === followers[i].userName) {
                seguidores = seguidores + 1;
            } 
            if (userName === followers[i].followerName) {
                seguindo = seguindo + 1;
            }
            i = i + 1;
         } 
    }

    getProfile();

    return (
        <div>
            < Navbar />

            <h1>Perfil</h1>
            <div>
                <label  className="profile">Seguidores</label>
                <label className="profile">@{seguidores}</label>
            </div>
            <div>
                <label  className="profile">Seguindo</label>
                <label className="profile">@{seguindo}</label>
            </div>
            <div>
                <label  className="profile">Nome de usuário</label>
                <label className="profile">@{user}</label>
            </div>
            <div>
                <label className="profile">Email</label>
                <label className="profile">{email}</label>
            </div>
            <div>
                <label className="profile">Descrição</label>
                <label className="profile">{descricao}</label>
            </div>

            
            <Footer />
        </div>
    );
}

export default Perfil2;