import { useState } from "react";
import "./Perfil.modules.css";
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Post from "./Post";
import profileimage from '../img/user.png'
import VerSeguidores from "./VerSeguidores";
import PerfilL from "./perfilLateral";

function Perfil({user}){

    /********************************************************************************************************************/
    //Parte lógica    
    const navigate = useNavigate();

    const [postList, setPostList] = useState([]);
    let posts = [];

    let userName = "";
    let id = parseInt(localStorage.getItem("id"));
    let email = "";
    let descricao = "";
    let imagem = "";
    let fotoCapa = "";
    let publicacoes = 0;
    
    let seguidores = 0;
    let listaSeguidores = [ ];
    let seguindo = 0;
    let listaSeguindo = [];
    let abrirSeguidores = 0;
    let abrirSeguindo = 0;
    let mostrarSeguidores = "a";
    
    const [perfil, setPerfil] = useState([]);
    const [followers, setFollowers] = useState([]);
    let p = parseInt(localStorage.getItem("perfil"));

    const getProfile = () => {
        Axios.get("http://localhost:3001/users").then((response) => { //pega os dados do backend
          setPerfil(response.data);
        });
        let i = 0;
        while (i < perfil.length){    //encontra os dados através do user conectado
            if (id === perfil[i].id) {
                //console.log("achei")
                descricao = perfil[i].descricao;
                email = perfil[i].email;
                imagem = perfil[i].foto;
                userName = perfil[i].nome;
                i = perfil.length;
            }
            i = i + 1;
         } 
         //console.log(imagem)
         Axios.get("http://localhost:3001/followers").then((response) => { //pega os dados do backend
            setFollowers(response.data);
        });

        i = 0;
        //console.log(followers)
        while (i < followers.length){    //encontra os dados através do user conectado
            if (id === followers[i].userID && followers[i].grupo === 0) {
                seguidores = seguidores + 1;
                listaSeguidores.push(followers[i].id);
            } 
            if (id === followers[i].followerID && followers[i].grupo === 0) {
                seguindo = seguindo + 1;
                listaSeguindo.push(followers[i].id);
            }
            i = i + 1;
         } 

         i = 0;
         while (i < listaSeguidores.length){    //encontra os dados através do user conectado
            if (listaSeguidores[i] === perfil[i].id) {
                listaSeguidores[i] = toString(perfil[i].nome)
                console.log(listaSeguidores[i])
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

    const verSeguidores = () => {
        if ( abrirSeguidores  === 0 ){
            console.log("abrir = 0")
            return < VerSeguidores id={id} lista={listaSeguidores} />
            abrirSeguidores = 0
        }

    }

    const alterarPerfil = () => {
        console.log("cheguei aqui")
        navigate("/alterarperfil");
    }

    getProfile();

    /********************************************************************************************************************/
    //Parte visual
    return (
        <><div className="feedGrupos">
        <Navbar />
        {p === 1 && ( <PerfilL /> )}
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
                        <h4 className="mt-0 mb-0">{userName}</h4>
                      </div>
                      <a href="#" className="btnEntrar" onClick={alterarPerfil}>Alterar perfil</a>
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
                      <Post user={val.userName} origem={val.originalPoster} origemID={val.originalPosterID} texto={val.text} imagem={val.image} id={val.id} userid={val.userNameID} grupoID={val.grupoID} />
                    );
                  })}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div><Footer /></>   
    );
}

export default Perfil;

