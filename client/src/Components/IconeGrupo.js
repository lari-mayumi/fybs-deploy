
import lolLogo from "../img/lol-logo.jpg"

function IconeGrupo({ nome, foto }){
    return (
        <>
            <div className="boxFotoGrupo">
                <img src={foto} className="fotoJogos" />
            </div>
            <div className="tituloJogo">
                <p>{nome}</p>
            </div>
        </>
    )
}

export default IconeGrupo;