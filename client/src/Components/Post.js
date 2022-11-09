import "./Post.modules.css";
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import Axios from "axios";
import blackheart from "../img/iconeHeart.png";
import redheart from "../img/iconeHeartFull.png";
import emptyShare from "../img/emptyShare.png";
import emptyRepost from "../img/emptyRepost.png";
import greenRepost from "../img/greenRepost.png";
import pixel from "../img/pixel.png";
import deleteButton from "../img/delete.png";

function Post({ user, texto, id, origem, origemID, imagem, userid, grupoID }) {
    const [perfil, setPerfil] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [shareList, setShareList] = useState([]);
    const navigate = useNavigate();
    let logUserID = parseInt(localStorage.getItem("id"));
    let fotoPerfil = "";

    let heart = blackheart;
    let share = emptyShare;
    let repost = emptyRepost;
    let like = 0;
    let i = 0;
    let likeID = 0;
    let shareID = 0;
    let w = "350px";

    let verperfil = "/verperfil/" + user

    if (imagem === null) {
        imagem = pixel;
        w = "0%";
    }

    const getData = () => {
        /********************* DADOS DOS USUÁRIOS PARA SETAR IMAGEM DE PERFIL ***************/
        Axios.get("http://localhost:3001/users").then((response) => {
            setPerfil(response.data);
        });

        i = 0;
        while (i < perfil.length) {
            if (user === perfil[i].nome) {
                fotoPerfil = perfil[i].foto; //seta a foto de perfil do dono do post
            }
            i = i + 1;
        }

        /********************* LIKES ***************/
        Axios.get("http://localhost:3001/likes").then((response) => { //seleciona todos os dados de likes
            setLikeList(response.data);
        });
        i = 0;
        while (i < likeList.length) { //verifica se o user está dando like ou dislike
            if (likeList[i].userID === userid && likeList[i].postID === id) {
                like = 1;
                likeID = likeList[i].id;
                heart = redheart;
            }
            i = i + 1;
        }
        if (like === 0) {
            heart = blackheart;
        }

        /********************* REPOST ***************/
        Axios.get("http://localhost:3001/shares").then((response) => { 
            setShareList(response.data);
        });
        i = 0;
        while (i < shareList.length) {
            if (shareList[i].userID === logUserID && shareList[i].posterID === origemID && shareList[i].postID === id) {
                //console.log("compartilhado: ", texto); 
                shareID = shareList[i].id;
                repost = greenRepost;
                i = shareList.length;
            } 
            else { repost = emptyRepost; }
            i = i + 1;
        }
    }

    /********************* DAR LIKE OU DISLIKE ***************/
    const darLike = () => {
        console.log(likeID)
        if (likeID === 0) {
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

/*
    const mudarCor = () => {
        if (repost === greenRepost) {
            repost = emptyRepost;
            console.log("vazio")
        }
        else {
            repost = greenRepost;
            console.log("verde")
        }
    }*/
    /********************* COMPARTILHAR OU DESCOMPARTILHAR ***************/
    const compartilhar = () => {
        if (repost === emptyRepost) { 
            Axios.post("http://localhost:3001/addshares", {//compartilhar
                user: logUserID,
                poster: origemID,
                post: id

            }).then(() => {
                console.log("success");
            });
            repost = greenRepost;
            console.log("compartilhado")
        }
        else {
            Axios.delete(`http://localhost:3001/unshare/${shareID}` //já compartilhado, excluir do banco de dados
            ).then(() => {
                console.log("success");
            });
            repost = emptyRepost; 
            console.log("excluido")
        }
    }

    /********************* EXCLUIR POST ***************/
    const excluirPost = () => {
        Axios.delete(`http://localhost:3001/deletepost/${id}` 
        ).then(() => {
            console.log("success");
        }); 
        console.log("excluido")
    }

    //console.log(origemID, logUserID)
    getData();

    return (
        <>
            <div className="gradePosts">
                {/* Cabeçalho do post - informações do user */}
                <div className="cabPost">
                    <div className="fotoUserPost">
                        <img src={fotoPerfil} />
                    </div>
                    <div className="nomeUserPost">
                        <button className="btnUser">
                            <a class="btnUser" href={verperfil}>@{user} • </a>
                        </button>
                    </div>
                    <div className="grupoUserPost">
                        {/* Configurar o grupo a qual o post foi vinculado aqui, assim como href para o grupo */}
                    </div>
                </div>
                {/* Corpo do post */}
                <div className="corpoPost">
                    <p className="texto">{texto}</p>
                    <img src={imagem} alt="..." width={w} />
                </div>                
                <div className="botoesPost">
                    <div className="botaoLike">
                        <button onClick={darLike}>
                            <img src={heart} alt="curtir"/>
                        </button>
                    </div>
                    <div className="botaoRepost">
                        <button onClick={compartilhar}>
                            <img src={repost} alt="compartilhar"/>
                        </button>
                    </div>
                    {origemID === logUserID && grupoID === 0 && (
                        <div className="botaoShare">
                            <button onClick={excluirPost}>
                                <img src={deleteButton} alt="apagar post"/>
                            </button>
                        </div>
                    )

                    }

                </div>
            </div>
        </>

    )
}

export default Post;
