import { Link, useNavigate } from 'react-router-dom';
import "./NewPost.modules.css"
import { useState } from "react";
import Axios from "axios";
import Globais from "../Globais";


function NewPost() {
    const navigate = useNavigate(); 
    const [perfil, setPerfil] = useState([]);
    const [texto, setTexto] = useState("");
    const [imagem, setImagem] = useState(""); 
    let id = parseInt(localStorage.getItem("id"));
    let fotoPerfil = "";
    let user = "";

    Axios.get("http://localhost:3001/users").then((response) => { 
          setPerfil(response.data);
    });
    let i = 0;
    while (i < perfil.length){   
        if (id === perfil[i].id) {
            fotoPerfil = perfil[i].foto;
            user = perfil[i].nome;
        }
        i = i + 1;
        } 

    const sendPost = () => {
        console.log("enviando")
        Axios.post("http://localhost:3001/createpost", { 
            texto: texto,
            user: user,
            imagem: imagem,
            id: id
        }).then(() => {
            console.log("success");
        });
    }

    const verPerfil = () => {
        navigate("/perfil");
    }

    return (
        <form className="form">
            <div className="nvPost">
                <button className="botaoPerfil" onClick={verPerfil}><img class="profile-pic mr-3" src={fotoPerfil} /></button>
                <textarea className="texto" placeholder="O que você está jogando hoje?" onChange={(event) => {
                    setTexto(event.target.value);
                }}>

                </textarea>
            </div>
            <div class="botoes">
                <div class="btnInserir">
                    <input type="file" id="postimage" name="postimage" accept="image/*" onChange={(event) => {
                        setImagem(event.target.value);
                    }}></input>
                    <p> Foto </p>
                </div>
                
                <button className="btnPubli" onClick={sendPost}><p>Publicar</p></button>
                
            </div>
        </form>
    )
}

export default NewPost;
