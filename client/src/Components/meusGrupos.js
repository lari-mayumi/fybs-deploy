import { useState } from "react";
import Axios from "axios";
import "./meusGrupos.modules.css";
import lolLogo from "../img/lol-logo.jpg"
import IconeGrupo from "./IconeGrupo";

function MeusGrupos( { grupos } ) {
    const [groupList, setGroupList] = useState([]);
    let nome = "";
    let foto = "";
    let listaGrupo = [];
    //console.log(grupos)
    const getGroup = () => {
        Axios.get("http://localhost:3001/grupos").then((response) => {
        setGroupList(response.data);
      });
  
      let i = 0;
      let j = 0;
      while (j < grupos.length && grupos[j] !== undefined) {
        i = 0;  
        while (i < groupList.length) {
            console.log('i:', i, 'j:', j)
            if (groupList[i].id === grupos[j]) {
              listaGrupo.push(groupList[i]);//[groupList[i].nomeGrupo, groupList[i].fotoGrupo]);
            }
            i = i + 1;
          }
          j = j + 1;
      }

    }
    //console.log(listaGrupo)

    getGroup();

    return (
        <>
            <div className="boxGrupos">
                <div className="tituloGrupo">
                    <p>Meus Grupos</p>
                </div>
                
                
                {listaGrupo.map((val, key) => {
                    return (
                        < IconeGrupo nome={val.nomeGrupo} foto={val.fotoGrupo} />
                    );
                })}
            </div>
        </>
    );
}

export default MeusGrupos;