import NewPostGrupo from "./form/NewPostGrupo";
import Post from "./Post";
import { useState } from "react";
import Axios from "axios";
import "./Grupos.modules.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import React from 'react'
import ftgrupo from './kokomi_by_IE.jpg';
import Globais from "./Globais";
import { useParams } from "react-router-dom";
import Capa from "../img/capa_grupo.jpg"

function Grupos(){
  // javascripto
    const { group } = useParams();
    const [postList, setPostList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [followers, setFollowers] = useState([]);
    let posts = [];
    let nome = "";
    let descricao = "";
    let foto = "";
    let publicacoes = 0;
    let seguidores = 0;
    let seguindo = 0;
    let entrar = 0;
    let entrarMsg = "";
    let user = Globais.user;
    let id = 0;
    let userID = parseInt(localStorage.getItem("id"));
    let fotoCapa = "";
    let followID = 0; 

    //console.log(Capa)
    const getGroup = () => {
      Axios.get("http://localhost:3001/grupos").then((response) => { //pega os dados de grupo
        setGroupList(response.data);
      });

      let i = 0;
      while (i < groupList.length) {
        if (groupList[i].idGrupo === group) { 
          //console.log("Achei:", groupList[i].nomeGrupo, groupList[i].descricao, groupList[i].foto);
          nome = groupList[i].nomeGrupo;
          descricao = groupList[i].descricao;
          foto = groupList[i].fotoGrupo;
          id = groupList[i].id;
          fotoCapa = groupList[i].capaGrupo;
        }
        i = i + 1;  
      }
      //console.log("")

      Axios.get("http://localhost:3001/posts").then((response) => { //pega os dados dos posts
      //console.log("Função getPosts: ", postList);
      setPostList(response.data);
      });
      i = 0;
      while (i < postList.length) {
        if (postList[i].grupoID=== id) { 
          //mostrar posts aqui
          publicacoes += 1;
          posts.push(postList[i]);
        }
        i = i + 1;  
      }

      Axios.get("http://localhost:3001/followers").then((response) => { 
          setFollowers(response.data);
      });

      i = 0;
      while (i < followers.length){ 
      //console.log("id user: ", userID, "id user banco: ", followers[i].userID, "id grupo: ", id, "id grupo banco: ", followers[i].userID, "é grupo: ", followers[i].grupo)
      //console.log(userID, parseInt(followers[i].followerID))
          if (id === followers[i].userID && followers[i].grupo === 1) {
            seguidores = seguidores + 1;
          } 
          if (userID === parseInt(followers[i].followerID) && id === followers[i].userID && followers[i].grupo === 1){ //não está entrando nesse if
            entrar = 1;
            followID = followers[i].id;

          }
          i = i + 1;
      } 
      //console.log(id)

      if (entrar === 1 ){ //entrar é seguir 
        entrarMsg = "Sair do Grupo";
      }
      else {
        entrarMsg = "Entrar para o Grupo";
      }
    }

  const entrarGrupo = () => {
    if (entrar === 1 ){
      //sair do grupo
      console.log(followID)
      Axios.delete(`http://localhost:3001/erasefollower/${followID}`
      ).then(() => {
            console.log("success");
        });
      entrar = 0;
      //window.location.reload();
    }
    else {
      //entrar no grupo
      Axios.post("http://localhost:3001/addfollower", { 
      seguidor: userID,
      seguindo: id,
      }).then(() => {
          console.log("success");
          console.log("seguindo grupo" );
      });
      entrar = 1;

    }
  }

    getGroup();

    // html e css
    return ( 
        <><div className="feedGrupos">
        <Navbar />
          <div className="perfilGrupo">
            <div className="col-md-8 mx-auto"> {/* Largura da caixa do perfil do grupo*/}              
              <div className="bg-white shadow rounded overflow-hidden">
                {/*cabecalho do grupo */}
                <div className="px-4 pt-0 pb-5 cover"> {/* foto de capa */}
                  <div className="media align-items-end profile-head">
                    <img className="px-4 pt-0 pb-5 cover" src={fotoCapa}></img>
                    <div className="profile mr-3">
                      <img src={foto} alt="..." width="150px" className="rounded mb-2 img-thumbnail" />
                      <div className="media-body mb-2 text-white">
                        <h4 className="mt-0 mb-0">{nome}</h4>
                      </div>
                      <a href="#" className="btnEntrar" onClick={entrarGrupo}>{entrarMsg}</a>
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
                  </ul>
                </div>
                {/*Descricao Grupo*/}
                <div className="px-4 py-3">
                  <h5 className="mb-0">Descrição</h5>
                  <div className="p-4 rounded shadow-sm bg-light">
                    <p className="font-italic mb-0"> {descricao} </p>
                  </div>
                </div>
                {/*Novo Post*/}
                <div className="px-4 py-3">
                  <h5 className="mb-0">Nova publicação</h5>
                  <div className="p-4 rounded shadow-sm bg-light">
                  <NewPostGrupo idgrupo={id} />
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
      </div><Footer /></>        
        
    )
}

export default Grupos;

//"https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9a2715ced150cb6e/5ef1374f6aaf2924fd231f62/league-client-update-header.jpg"