import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Post from "./Post";
import fotoRadar from "../img/jinx.jpeg"
import iconeCurtir from "../img/iconeHeart.png"
import iconeCurtido from "../img/iconeHeartFull.png"
import Axios from "axios";

function Busca(){
    const { key } = useParams();
    const [postList, setPostList] = useState([]);
    let posts = [];
    let b = key.replaceAll("+", " ")
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
      //console.log(posts)
    }

    buscar();



    return (
        <>
            <Navbar />
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
            <div className="linha"> {/**Da para usar looping para repetir 4 vezes? */}
              <div className="jogo"><p>Jogo 01</p></div>
              <div className="btnSeguir"><p>Seguir</p></div>
            </div>
            <div className="linha">
              <div className="jogo"><p>Jogo 02</p></div>
              <div className="btnSeguir"><p>Seguir</p></div>
            </div>
            <div className="linha">
              <div className="jogo"><p>Jogo 03</p></div>
              <div className="btnSeguir"><p>Seguir</p></div>
            </div>
            <div className="linha">
              <div className="jogo"><p>Jogo 04</p></div>
              <div className="btnSeguir"><p>Seguir</p></div>
            </div>
            <div className="linha">
              <div className="btnExplorar"><p>Explorar mais na fybs...</p></div>
            </div>
          </div>
          {/** Caixa Radar 01*/}
          <h1>Radar</h1>
          <div className="radar">
            {/** user e botao seguir*/}
            <div className="userRadar">
              <div className="userPostR"><p>@teste</p></div>
              <div className="btnSeguir"><p>Seguir</p></div>
            </div>
            {/** foto do radar*/}
            <div className="postRadar">
              <div className="jogo">
                <img src={fotoRadar} alt="..." width="100%" />
              </div>
            </div>
            {/** likes do post*/}
            <div className="acoesRadar">
              <div className="btnCurtir">
                <img src={iconeCurtir} alt="..." width="15px" />
              </div>
              <div className="txtLikes">
                <p>100 likes</p>
              </div>
            </div>
          </div>
          {/** Caixa Radar 02 */}
          <div className="radar">
            {/** user e botao seguir*/}
            <div className="userRadar">
              <div className="userPostR"><p>@teste</p></div>
              <div className="btnSeguir"><p>Seguir</p></div>
            </div>
            {/** foto do radar*/}
            <div className="postRadar">
              <div className="jogo">
                <img src={fotoRadar} alt="..." width="100%" />
              </div>
            </div>
            {/** likes do post*/}
            <div className="acoesRadar">
              <div className="btnCurtir">
                <img src={iconeCurtir} alt="..." width="15px" onclick="curtir" className="imgCurtir" />
              </div>
              <div className="txtLikes">
                <p>100 likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
        </>
    )
}

export default Busca;