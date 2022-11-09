import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Post from "./Post";
import fotoRadar from "../img/jinx.jpeg"
import iconeCurtir from "../img/iconeHeart.png"
import iconeCurtido from "../img/iconeHeartFull.png"
import Axios from "axios";
import DescubraJogo from "./DescubraJogo";
import Radar from "./Radar";
import PerfilL from "./perfilLateral";

function Busca(){
    const { key } = useParams();
    const [postList, setPostList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    let posts = [];
    let b = key.replaceAll("+", " ")
    let id = parseInt(localStorage.getItem("id"));
    let p = parseInt(localStorage.getItem("perfil"));
    let postsRadar = [];
    let jogos = [];
    let follows = [];

  //console.log(typeof b)
    const buscar = () => {
      Axios.get("http://localhost:3001/posts").then((response) => { //seleciona todos os dados de post
      setPostList(response.data);
      });
      
      let i = 0;
      let texto = "";
      while (i < postList.length) {
        texto = postList[i].text.toLowerCase();
          if (postList[i].userName.includes(b) || texto.includes(b)) { 
              posts.push(postList[i]);
          }
          i = i + 1;  
      }

      Axios.get("http://localhost:3001/grupos").then((response) => { //pega os dados de grupo
        setGroupList(response.data);
      });

      i = 0;
      while (i < 4 && groupList[i] !== undefined) {
        jogos.push(groupList[i]);
        i = i + 1;
      }
  
      postList.sort((a, b) => {
        return b.likes - a.likes;
      });
      i = 0;
      while (i < 2 && postList[i] !== undefined) {
        postsRadar.push(postList[i]);
  
        i = i + 1;
      }
    }

    buscar();



    return (
        <>
            <Navbar />
            {p === 1 && ( <PerfilL /> )}
            <div className="feedPrincipal"> 
            <div className="postsFeed">
          {posts.map((val, key) => {
            return (
              <Post user={val.userName} texto={val.text} id={val.id} />
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

export default Busca;