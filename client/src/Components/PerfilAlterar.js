import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.modules.css";
import Axios from "axios";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Globais from "./Globais";

function PerfilAlterar(){  //falta salvar as alterações no banco de dados
 
    let id = parseInt(localStorage.getItem("id"));
    const [newUser, setNewUser] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newDescricao, setNewDescricao] = useState("");
    const [imagem, setImagem] = useState("");
    const [newSenha, setNewSenha] = useState("");

    let email = "";
    let descricao = "";
    let image = "";
    let userName = "";
    let fotoCapa = "";
    let senha = "";
    let publicacoes = 0;

    const navigate = useNavigate()
    const [perfil, setPerfil] = useState([]);

    const getProfile = () => {
        Axios.get("http://localhost:3001/users").then((response) => { //pega os dados do backend
          setPerfil(response.data);
      });

      let i = 0;
      while (i < perfil.length){    //encontra os dados através do user conectado
        if (id === perfil[i].id) {
            descricao = perfil[i].descricao;
            email = perfil[i].email;
            image = perfil[i].foto;
            userName = perfil[i].nome;
            i = perfil.length;
        }
        i = i + 1;
      } 
    }
    //console.log(image);
    const alterarDados = () => {
        if (newUser != "") { userName = newUser };
        if (newEmail != "") { email = newEmail };
        if (newDescricao != "") { descricao = newDescricao };
        if (imagem != "") { image = imagem };
        console.log(userName, email, descricao, image, id)
        Axios.put("http://localhost:3001/alterardados", { //essa função envia os dados para o backend
                user: userName,
                email: email,
                descricao: descricao,
                imagem: image,
                id: id,
            }).then(() => {
                console.log("success");
            }); 
            navigate("/perfil");
    }
    
    getProfile();
    

    return (
        <div>
           <div className="feedGrupos">
            <Navbar />
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
                        <a href="#" className="btnEntrar" onClick={alterarDados}>Salvar alterações</a>
                        </div>                    
                    </div>
                    </div>
                    {/*Seguidores e segindo*/}
                    <div className="bg-light p-4 d-flex justify-content-center text-center">
                    <ul className="list-inline mb-0">

                    </ul>
                    </div>
                    {/*Descricao Grupo*/}
                    <div className="px-4 py-3">
                    <h5 className="mb-0">Nome de usuário</h5>
                    <div className="p-4 rounded shadow-sm bg-light">
                    <input
                        type="text"
                        text="nome_de_usuario"
                        name="newUser"
                        placeholder={userName}
                        onChange={(event) => {
                            setNewUser(event.target.value);
                        }}
                    />
                    </div>       
                    <h5 className="mb-0">Email</h5>
                    <div className="p-4 rounded shadow-sm bg-light">
                    <input
                        type="text"
                        text="email"
                        name="email"
                        placeholder={email}
                        onChange={(event) => {
                            setNewEmail(event.target.value);
                        }}
                    />
                    </div>             
                    <h5 className="mb-0">Descrição</h5>
                    <div className="p-4 rounded shadow-sm bg-light">
                    <input
                        type="descricao"
                        text="descricao"
                        name="newDescricao"
                        placeholder={descricao}
                        onChange={(event) => {
                            setNewDescricao(event.target.value);
                        }}
                    />
                    </div>
                    <h5 className="mb-0">Senha</h5>
                    <div className="p-4 rounded shadow-sm bg-light">
                    <input
                        type="password"
                        text="password"
                        name="senha"
                        placeholder={senha}
                        onChange={(event) => {
                            setNewSenha(event.target.value);
                        }}
                        />
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div><Footer />
        </div>
    );
}

export default PerfilAlterar;