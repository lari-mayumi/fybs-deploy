import Axios from "axios";
import "./Radar.modules.css"
import { useState } from "react";
import fotoRadar from "../img/jinx.jpeg"
import iconeCurtir from "../img/iconeHeart.png"
import iconeCurtido from "../img/iconeHeartFull.png"
import pixel from "../img/pixel.png"

function Radar( { user, id, idPoster, likes, text, image} ){
    const [postList, setPostList] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [followers, setFollowers] = useState([]);
    let userID = parseInt(localStorage.getItem("id"));
    let posts = [];
    let likeID = 0;
    let heart = iconeCurtido;
    let seguindo = 0;
    let botao = "Seguir";
    let w = "100%";
    
    //console.log(idPoster)
    if (image === null){
        image = pixel;
        w = "0%";
    }

    const getLikes = () => {
        Axios.get("http://localhost:3001/likes").then((response) => { //seleciona todos os dados de likes
        setLikeList(response.data);
        });
        //console.log(likeList)
        let i=0;
        while (i < likeList.length){ //verifica se o user está dando like ou dislike
            //console.log(likeList[i].postId, id)
            if (likeList[i].userID === userID && likeList[i].postID === id) {
                //console.log("já tem like ")
                likeID = likeList[i].id;
                heart = iconeCurtido;
            } 
            i = i + 1;
        }
        if (likeID === 0){
          //console.log("não tem like")
            heart = iconeCurtir;
        }

        /**** Verifica se o usuário já segue o dono do post */
        Axios.get("http://localhost:3001/followers").then((response) => { 
          setFollowers(response.data);
          });
          
          i = 0;
          while (i < followers.length){ 
            //console.log("seguindo")
              if (idPoster === followers[i].userID && userID === followers[i].followerID && followers[i].grupo === 1) {
                seguindo =  1;
                botao = "Seguindo";
              } 
              i = i + 1;
          } 
    }

    const darLike = () =>{
        console.log(likeID)
        if (likeID === 0){
            Axios.post("http://localhost:3001/addlike", { 
                user: userID,
                post: id
                
            }).then(() => {
                console.log("success");
            });
            heart = iconeCurtido; 
        } else {
            Axios.delete(`http://localhost:3001/dislike/${likeID}`
            ).then(() => {
                    console.log("success");
                });
            console.log("dados enviados")
            heart = iconeCurtir;
        }
    }

    const seguir = () => {


      //console.log(seguindo, 0)
      if (seguindo === 0) {
          Axios.post("http://localhost:3001/addfollower", { 
              seguidor: userID,
              seguindo: idPoster,
              }).then(() => {
                  console.log("success");
                  //console.log("seguindo grupo" );
              });
      }       
      botao = "Seguindo";
      seguindo = 1;
    }

    const verPerfil = () => {

    }

    getLikes();

    return (
        <>
           {/** Caixa Radar 01*/}
          <div className="radar">
            {/** user e botao seguir*/}
            <div className="userRadar">
              <div className="userPostR"><button className="button" onClick={verPerfil}><p>@{user}</p></button></div>
              <div className="btnSeguir"><button className="button" onClick={seguir}><p>{botao}</p></button></div>
            </div>
            {/** foto do radar*/}
            <div className="postRadar">
              <div className="jogo">
                <p>{text}</p>
                <img src={image} alt="..." width={w} />
              </div>
            </div>
            {/** likes do post*/}
            <div className="acoesRadar">
              <div className="btnCurtir" onClick={darLike}>
                <img src={heart} alt="..." width="15px" />
              </div>
              <div className="txtLikes">
                <p>{ likes }</p>
              </div>
            </div>
          </div>
        </>
    )
}

export default Radar;