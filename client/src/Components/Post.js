import "./Post.modules.css";
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import Axios from "axios";
import blackheart from "../img/blackheart.png"
import redheart from "../img/redheart.png"
import emptyShare from "../img/emptyShare.png"
//import blueShare from "../img/blueShare.png"
import emptyRepost from "../img/emptyRepost.png"
import greenRepost from "../img/greenRepost.png"

function Post({ user, texto, id }) {
    const [perfil, setPerfil] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const navigate = useNavigate();
    let userid = parseInt(localStorage.getItem("id"));
    let fotoPerfil = "";

    let heart = blackheart;
    let share = emptyShare;
    let repost = emptyRepost;
    let like = 0;
    let i = 0;
    let likeID = 0;

    let verperfil = "/verperfil/" + user

    const getData = () => {
        Axios.get("http://localhost:3001/users").then((response) => { 
            setPerfil(response.data);
        });

        i = 0;
        while (i < perfil.length){   
            if (user === perfil[i].nome) {
                fotoPerfil = perfil[i].foto; //seta a foto de perfil do dono do post
            }
            i = i + 1;
        } 
      
        Axios.get("http://localhost:3001/likes").then((response) => { //seleciona todos os dados de likes
            setLikeList(response.data);
        });
        //console.log(likeList)
        i = 0;
        while (i < likeList.length){ //verifica se o user está dando like ou dislike
            //console.log(likeList[i].postId, id)
            if (likeList[i].userID === userid && likeList[i].postID === id) {
                //console.log("já tem like ")
                like = 1;
                likeID = likeList[i].id;
                heart = redheart;
            } 
            i = i + 1;
        }
        if (like === 0){
            heart = blackheart;
        }
    }

    const darLike = () =>{
        console.log(likeID)
        if (likeID === 0){
            Axios.post("http://localhost:3001/addlike", { 
                user: userid,
                post: id
                
            }).then(() => {
                console.log("success");
            });
            heart = redheart; 
        } else {
            Axios.delete(`http://localhost:3001/dislike/${likeID}`
            ).then(() => {
                    console.log("success");
                });
            console.log("dados enviados")
            heart = blackheart;
        }
    }

    getData();

    return (
        <div className="post">
            <div className="userPost">
                <img className="profile-pic mr-3" src={fotoPerfil} />
                <button className="btnUser"><a class="btnUser" href={verperfil}>{user}</a></button>
                <div className="corpoPost">
                    <p className="texto">{texto}</p>
                </div>
                <div className="btnIntercoes">
                <button onClick={darLike}><img src={ heart } /></button>
                <button><img src={ repost } /></button>
                <button><img src={ share } /></button>
                </div>
            </div>

        </div>
    )
}

export default Post;
