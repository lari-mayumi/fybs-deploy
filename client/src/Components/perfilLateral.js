import { useState } from "react";
import fotoPerfil from "../img/userPerfil.jpg"
import setaIcon from "../img/angle-left.png"
import setaCimaIcon from "../img/seta-cima.png"
import "./PerfilLateral.modules.css";
import MeusG from "./meusGrupos";
import MinhasP from "./MinhasPubli";
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function PerfilLateral() {
    const [perfil, setPerfil] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [postList, setPostList] = useState([]);
    const navigate = useNavigate();
    let posts = [];
    let listaGrupos = [];
    let imagem = "";
    let publicacoes = 0;
    let seguindo = 0;
    let seguidores = 0;
    let img = "";
    let txt = "";
    let usrnm = 0;

    let userName = "";
    let id = parseInt(localStorage.getItem("id"));
    
    const getProfile = () => {


        Axios.get("http://localhost:3001/users").then((response) => { 
          setPerfil(response.data);
        });
        let i = 0;
        while (i < perfil.length){
            if (id === perfil[i].id) {
                imagem = perfil[i].foto;
                userName = perfil[i].nome;
                i = perfil.length;
            }
            i = i + 1;
         } 
         
        Axios.get("http://localhost:3001/followers").then((response) => { 
            setFollowers(response.data);
        });

        i = 0;
        while (i < followers.length){    
            if (id === followers[i].userID && followers[i].grupo === 0) {
                seguidores = seguidores + 1;
            } 
            if (id === followers[i].followerID && followers[i].grupo === 0) {
                seguindo = seguindo + 1;
            }
            if (id === followers[i].followerID && followers[i].grupo === 1){
                listaGrupos.push(followers[i].userID);
                //console.log(followers[i])
            }
            i = i + 1;
         } 
         //console.log(listaGrupos)

        Axios.get("http://localhost:3001/posts").then((response) => {  //erro ao pegar dados dos posts
        setPostList(response.data);
        });
        i = 0;
        while (i < postList.length){
            if (postList[i].originalPosterID === id){ publicacoes += 1; }
            i = i + 1;  
        }

        posts.push(postList[0]);
        /*if (postList[0].image !== null){
            img = postList[0].image;
        }
        if (postList[0].image === "fybs/server/public/users/undefined"){
            img = "";
        }    
        if (postList[0].text !== null){
            txt = postList[0].text;
        }*/
        console.log('1', txt)

        //e.preventDefault();*
    }

    const editarPerfil = () => {
        navigate("/alterarperfil");
    }

    const verPerfil = () => {
        navigate("/perfil");
    }
    
    const fecharPerfil = () => {
        localStorage.setItem("perfil", 0);
    }
 

    getProfile();
    

    return (
        <>
            <div className="blocoPerfilLateral">
                {/** Perfil lateral */}
                <div className="perfilBloco">
                    {/** Cabeçalho do perfil */}
                    <div className="cabPerfil">
                        {/** Foto do Perfil */}
                        <div className="leftSide">
                            <img src={imagem} alt="..." className="ftPerfil" />
                        </div>
                        {/** Seguidores e Seguindo */}
                        <div className="rightSide">
                            <div className="userTitulo">
                                <p> @{userName} </p>
                                <button onClick={fecharPerfil}><img src={setaIcon} alt="..." className="iconeSeta" /></button>
                            </div>
                            <table className="numFollows">
                                <tr>
                                    <td>
                                        <p> {publicacoes} </p>
                                        <p>Publicações</p>
                                    </td>
                                    <td>
                                        <p> {seguidores} </p>
                                        <p>Seguindo</p>
                                    </td>
                                    <td>
                                        <p> {seguindo} </p>
                                        <p>Seguidores</p>
                                    </td>
                                </tr>
                            </table>
                            <a href="#" className="btnEditar" onClick={editarPerfil}>Editar Perfil</a>
                        </div>
                    </div>
                    {/** Corpo do perfil */}
                    <div className="corpoPerfil">
                        {/* Caixa mostrar perfil completo */}
                        <button onClick={verPerfil}>
                        <div className="perfilMais">
                            <div className="txtPerfilMais">
                                <p> Visualizar Perfil completo... </p>
                            </div>
                        </div>
                        </button>
                        {/** Meus Grupos */}
                        <div className="grupos-meus">
                            {<MeusG grupos={listaGrupos}/>}
                        </div>
                        {/** Meus Posts */}
                        <div className="posts-meus">
                            {<MinhasP texto={txt} imagem={img} user={usrnm} />}
                        </div>
                    </div>
                    
                    <div className="morePublis">
                        <img src={setaCimaIcon} alt="..." className="iconeSeta" />
                    </div>
                </div>

            </div>
        </>
    );
}

export default PerfilLateral;
