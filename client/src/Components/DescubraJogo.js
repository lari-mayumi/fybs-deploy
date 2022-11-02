import "./DescubraJogo.modules.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import Axios from "axios";

function DescubraJogo({ nome, idGrupo, id }){
    const navigate = useNavigate();
    const [followers, setFollowers] = useState([]);
    let userID = parseInt(localStorage.getItem("id"));
    let seguindo = 0;
    let botao = "Seguir";

    const getData = () =>{
        Axios.get("http://localhost:3001/followers").then((response) => { 
            setFollowers(response.data);
        });
    
        let i = 0;
        while (i < followers.length){ 
            if (id === followers[i].userID && userID === followers[i].followerID && followers[i].grupo === 1) {
              seguindo =  1;
              botao = "Seguindo";
            } 
            i = i + 1;
        } 
    }
    
    const verJogo = () => {
        navigate("/grupos/" + idGrupo);
    }
    //console.log(seguindo)
    const seguirJogo = () => {
        //console.log("seguindo...")
        console.log(seguindo, 0)
        if (seguindo === 0) {
            Axios.post("http://localhost:3001/addfollower", { 
                seguidor: userID,
                seguindo: id,
                }).then(() => {
                    console.log("success");
                    console.log("seguindo grupo" );
                });

        }
        //botao = "Seguindo";
        //  seguindo = 1;
    }

    getData();

    return (
        <>
            <div className="linha"> {/**Da para usar looping para repetir 4 vezes? */}
              <div className="jogo">
                <button className="linha" onClick={verJogo}><p className="lateral">{nome}</p></button>
              </div>
              <div className="btnSeguir"><button className="linha" onClick={seguirJogo}><p>{botao}</p></button></div>
            </div>
        </>
    )
}

export default DescubraJogo;