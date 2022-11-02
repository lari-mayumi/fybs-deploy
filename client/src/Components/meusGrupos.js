import "./meusGrupos.modules.css";
import lolLogo from "../img/lol-logo.jpg"

function meusGrupos (){

    return(
        <div className="boxGrupos">
            <table className="grupos">
                <tr>
                    <p>Meus Grupos</p>
                </tr>
                <tr>
                    <img src={lolLogo} className="fotoJogos"/>
                </tr>
                <tr>
                    <p>nome do jogo</p>
                </tr>
            </table>
        </div>
    );
}

export default meusGrupos;