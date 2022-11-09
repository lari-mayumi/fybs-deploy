import NewPost from "./form/NewPost";
import Post from "./Post";
import { useState } from "react";
import Axios from "axios";
import Navbar from "./layout/Navbar";
import PerfilL from "./perfilLateral";
import Footer from "./layout/Footer";
import "./Feed.modules.css";
import fotoRadar from "../img/jinx.jpeg"
import iconeCurtir from "../img/iconeHeart.png"
import iconeCurtido from "../img/iconeHeartFull.png"
import DescubraJogo from "./DescubraJogo";
import Radar from "./Radar";



function Feed() {
  const [postList, setPostList] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [blocoPerfil, setBlocoPerfil] = useState(["blocoPerfilLateralOcultar"]);
  let id = parseInt(localStorage.getItem("id"));
  let posts = [];
  let postsRadar = [];
  let jogos = [];
  let follows = [];
  let trocaIcone = 0;
  let mostrarPerfil = 0;
  let p = parseInt(localStorage.getItem("perfil"));

  const getPosts = () => {
    Axios.get("http://localhost:3001/posts").then((response) => { //seleciona todos os dados de post
      setPostList(response.data);
      // console.log(postList)
    });

    Axios.get("http://localhost:3001/followers").then((response) => { //pega as informações de seguidores
      setFollowers(response.data);
    });

    let i = 0;
    while (i < followers.length) {    //seleciona os usuários e grupos seguidos pelo user logado
      if (id === followers[i].id /*&& followers[i].grupo === 0*/) {
        follows.push([followers[i].userID, followers[i].grupo])
      }
      i = i + 1;
    }
    //console.log(postList)

    postList.sort((a, b) => {
      return b.id - a.id;
    });

    i = 0;
    while (i < postList.length) {
      if ((follows[0].includes(postList[i].userNameID, 0) || follows[0].includes(postList[i].originalPosterID, 0) || postList[i].userNameID === id || postList[i].originalPosterID === id) && follows[1] === postList[i].grupo) {
        posts.push(postList[i]);
      }
      i = i + 1;
    }
    //console.log(posts)

    postList.sort((a, b) => {
      return b.likes - a.likes;
    });
    i = 0;
    while (i < 2 && postList[i] !== undefined) {
      postsRadar.push(postList[i]);

      i = i + 1;
    }
    //console.log(postsRadar)


    Axios.get("http://localhost:3001/grupos").then((response) => { //pega os dados de grupo
      setGroupList(response.data);
    });

    i = 0;
    while (i < 4 && groupList[i] !== undefined) {
      jogos.push(groupList[i]);
      i = i + 1;
    }
    //console.log(jogos)

  }

  function trocar() {
    if (trocaIcone === 0) { //reseta quando o contatador for igual ao tamanho da array e volta a 1° img
      trocaIcone = 1;
    }
    document.getElementById("imgCurtir").src = { iconeCurtido }; //altera a img do elemento "bomdia" de acordo com o indice
  }
  //console.log(posts)

  getPosts();

  return (
    <>
      <Navbar />
      {/* Perfil abaixo comentado porem é necessario programar para show/hide !!!!!!!!!!!!!! */}
      {p === 1 && ( <PerfilL /> )}
      {/** Feed */}
      <div className="feedPrincipal">
        <div className="postsFeed">
          <NewPost />
          <div className="divisao" />
          {/* Posts dos meus seguidores */}
          {posts.map((val, key) => {
            //console.log('id: ', val.originalPosterID)
            return (
              <Post user={val.userName} origem={val.originalPoster} origemID={val.originalPosterID} texto={val.text} imagem={val.image} id={val.id} userid={val.userNameID} grupoID={val.grupoID} />
            );
          })}
        </div>
        {/** Caixas lateral - Descubra e radar */}
        <div className="lateral">
          {/** Caixa Descubra*/}
          <div className="descubra">
            <h1>Descubra</h1>
            <div className="linhaJogos">
              {jogos.map((val, key) => {
                return (
                  < DescubraJogo nome={val.nomeGrupo} idGrupo={val.idGrupo} id={id} />
                );
              })}
            </div>
            <div className="linhaExplorar">
              <div className="btnExplorar"><p>Explorar mais na fybs...</p></div>
            </div>
          </div>
          {/** Caixa Radar 01*/}
          <h1>Radar</h1>
          {postsRadar.map((val, key) => {
            //console.log(val.originalPosterID)
            return (
              < Radar user={val.userName} id={val.id} idPoster={val.originalPosterID} likes={val.likes} text={val.text} image={val.image} />
            );
          })}

        </div>
      </div>

      <Footer />

    </>

  )
}

export default Feed;