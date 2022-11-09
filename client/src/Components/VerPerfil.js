import { useState } from "react";
import "./Perfil.modules.css";
import Axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Globais from "./Globais";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Post from "./Post";
import profileimage from '../img/user.png'

function VerPerfil(){

    /********************************************************************************************************************/
    //Parte lógica
    const { user } = useParams();

    const [postList, setPostList] = useState([]);
    let posts = [];

    let id = 0;
    let descricao = "";
    let imagem = "";
    let fotoCapa = "";
    let publicacoes = 0;
    let nome = user;

    let botao = "Seguir"
    let seguidores = 0;
    let seguindo = 0;
    
    const [perfil, setPerfil] = useState([]);
    const [followers, setFollowers] = useState([]);

    //console.log(user)
    const getProfile = () => {
        Axios.get("http://localhost:3001/users").then((response) => { //pega os dados do backend
          setPerfil(response.data);
        });
        let i = 0;
        while (i < perfil.length){    //encontra os dados através do user conectado
            if (user === perfil[i].nome) {
                //console.log("achei")
                descricao = perfil[i].descricao;
                imagem = perfil[i].foto;
                id = perfil[i].id;
                i = perfil.length;
            }
            i = i + 1;
         } 

         Axios.get("http://localhost:3001/followers").then((response) => { //pega os dados do backend
            setFollowers(response.data);
        });

        i = 0;
        while (i < followers.length){    //encontra os dados através do user conectado
            if (id === followers[i].id && followers[i].grupo === 0) {
                seguidores = seguidores + 1;
            } 
            if (id === followers[i].id && followers[i].grupo === 0) {
                seguindo = seguindo + 1;
            }
            i = i + 1;
         } 

         
        Axios.get("http://localhost:3001/posts").then((response) => { //pega os dados dos posts
        //console.log("Função getPosts: ", postList);
        setPostList(response.data);
        });
        i = 0;
        while (i < postList.length) {
            if (postList[i].originalPosterID === id) { 
                publicacoes += 1;
                posts.push(postList[i]);
            }
            i = i + 1;  
        }
    }

    const seguirPerfil = () => {
        if (botao === "Seguir"){
            botao = "Deixar de Seguir";
        }
        else {
            botao = "Seguir";
        }
    }

    getProfile();

    /********************************************************************************************************************/
    //Parte visual
    return (
        <div>
            <div className="feedGrupos">
                    <Navbar />
                    <div className="perfilGrupo">
                        <div className="col-md-8 mx-auto"> {/* Largura da caixa do perfil do grupo*/}              
                        <div className="bg-white shadow rounded overflow-hidden">
                            {/*cabecalho do grupo */}
                            <div className="px-4 pt-0 pb-5 cover"> {/* foto de capa */}
                            <div className="media align-items-end profile-head">
                                <img className="px-4 pt-0 pb-5 cover" src={fotoCapa}></img>
                                <div className="profile mr-3">
                                <img src={imagem} alt="..." width="150px" className="rounded mb-2 img-thumbnail" />
                                <div className="media-body mb-2 text-white">
                                    <h4 className="mt-0 mb-0">{nome}</h4>
                                </div>
                                <a href="#" className="btnEntrar" onClick={seguirPerfil}>Seguir</a>
                                </div>                    
                            </div>
                            </div>
                            {/*Seguidores e segindo*/}
                            <div className="bg-light p-4 d-flex justify-content-center text-center">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item px-4">
                                <h5 className="numGrupo">{publicacoes}</h5>
                                <small className="numGrupo"><i className="fas fa-image mr-1" /> Publicações</small>
                                </li>
                                <li className="list-inline-item px-4">
                                <h5 className="numGrupo">{seguidores}</h5>
                                <small className="numGrupo"> <i className="fas fa-user mr-1" /> Seguidores</small>
                                </li>
                                <li className="list-inline-item px-4">
                                <h5 className="numGrupo">{seguidores}</h5>
                                <small className="numGrupo"> <i className="fas fa-user mr-1" /> Seguindo</small>
                                </li>
                            </ul>
                            </div>
                            {/*Descricao Grupo*/}
                            <div className="px-4 py-3">
                            <h5 className="mb-0">Descrição</h5>
                            <div className="p-4 rounded shadow-sm bg-light">
                                <p className="font-italic mb-0"> {descricao} </p>
                            </div>
                            </div>
                            {/*Posts*/}
                            <div className="py-4 px-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="mb-0">Publicações</h5>
                            </div>
                            <div className="posts">
                            {posts.map((val, key) => {
                                return (
                                <Post user={'@' + val.userName} texto={val.text} />
                                );
                            })}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div><Footer />
        </div>
    );
}

export default VerPerfil;
