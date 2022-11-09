import { Link, useNavigate } from 'react-router-dom';
import "./NewPost.modules.css"
import { useState, useEffect } from "react";
import Axios from "axios";
import Globais from "../Globais";
import api from '../../configApi';
import axios from 'axios';
//import { response } from 'express';
//import carmilla from "../../../../../server/public/users/1667400724335_3826641-castlevania-s4-08.jpeg";
import lixo from "../../img/users/1667764356282_minus.png"


function NewPost() {
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState([]);
    const [texto, setTexto] = useState("");
    const [imagem, setImagem] = useState("");
    const [imageList, setImageList] = useState("");
    let id = parseInt(localStorage.getItem("id"));
    let fotoPerfil = "";
    let user = "";

    Axios.get("http://localhost:3001/users").then((response) => {
        setPerfil(response.data);
    });
    let i = 0;
    while (i < perfil.length) {
        if (id === perfil[i].id) {
            fotoPerfil = perfil[i].foto;
            user = perfil[i].nome;
        }
        i = i + 1;
    }



    const sendPost = async e => {

        e.preventDefault();
        //console.log('image:', imagem)

        if (imagem === null) { setImagem(""); }
        else {
            const formData = new FormData();
            formData.append('image', imagem);
            //console.log('formulario: ', formData)

            const headers = {
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
            //console.log('header: ', headers.headers)
           Axios.post("http://localhost:3001/upload-image", formData, headers)
                .then(response => {
                    console.log(response);
                }).catch((err) => {
                    if (err.response) {
                        console.log(err.response);
                    } else {
                        console.log("Erro: Tente mais tarde.");
                    }
                });
        }

        Axios.get("http://localhost:3001/list-image").then((response) => { //pegar lista de imagens
            setImageList(response.data);
        });
        /*let i = 0;
        while (i < perfil.length) {
            if (id === perfil[i].id) {

            }
            i = i + 1;
        }
    

        let img = "http://localhost:3001/server/public/users/" + imagem.name;*/
        //let imagePath = 'fybs/server/public/users/' + imagem.name;
        let x = imageList.length - 1
        let img = imageList[x].image;
        let imagePath = 'http://localhost:3001/files/' + imagem.name;

        console.log(imagem)
/*
        Axios.post("http://localhost:3001/createpost", {
            texto: texto,
            user: user,
            imagem: imagePath,
            id: id,
            origem: user
        }).then(() => {
            console.log("success");
        });*/


    }

    const verPerfil = () => {
        localStorage.setItem("perfil", 1);
        //navigate("/perfil");
    }

    const uploadImage = async e => {
        e.preventDefault();
        console.log("Upload imagem");
        const formData = new FormData();
        formData.append('image', imagem);

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }
        console.log(imagem)
        await api.post("/upload-image", formData, headers)
            .then(response => {
                console.log(response);
            }).catch((err) => {
                if (err.response) {
                    console.log(err.response);
                } else {
                    console.log("Erro: Tente mais tarde.");
                }
            });
    }

    return (
        <>
            <form className="form">
                <div className="nvPost">
                    <div className="boxUser">
                        <button className="botaoPerfil" onClick={verPerfil}>
                            <img class="profile-pic mr-3" src={fotoPerfil} />
                        </button>
                    </div>
                    <textarea className="texto" placeholder="O que você está jogando hoje?" onChange={(event) => {
                        setTexto(event.target.value);
                    }}>
                    </textarea>
                    <form onSubmit={uploadImage}>
                        <input type="file" name="image" onChange={e => setImagem(e.target.files[0])} />
                    </form>
                    <img src={imagem} />
                </div>
                <div class="botoes">
                    <div class="btnInserir">
                        <input type="file" id="postimage" name="postimage" accept="image/*" onChange={(event) => {
                            setImagem(event.target.value);
                        }}></input>
                        {/*<form action='/profile' method='post' encType='multipart/form-data'>
                        <input type="file" name="postImage"/>
                </form>*/}
                        <p> Foto </p>
                    </div>
                    <div className="btnPubli">
                        <button className="publicar" onClick={sendPost}>
                            <p>Publicar</p>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewPost;
