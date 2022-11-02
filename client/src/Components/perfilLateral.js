import fotoPerfil from "../img/userPerfil.jpg"
import setaIcon from "../img/angle-left.png"
import "./PerfilLateral.modules.css";
import MeusG from "./meusGrupos";

function perfilLateral() {

    return (
        <>
            {/** Perfil lateral */}
            <div className="perfilBloco">
                {/** Cabeçalho do perfil */}
                <div className="cabPerfil">
                    {/** Seguidores e Seguindo */}
                    <div className="rightSide">
                        <div className="userTitulo">
                            <p> @direita </p>
                            <img src={setaIcon} alt="..." className="iconeSeta" />
                        </div>
                        <table className="numFollows">
                            <tr>
                                <td>
                                    <p> 100 </p>
                                    <p>Publicações</p>
                                </td>
                                <td>
                                    <p> 100 </p>
                                    <p>Seguindo</p>
                                </td>
                                <td>
                                    <p> 100 </p>
                                    <p>Seguidores</p>
                                </td>
                            </tr>
                        </table>
                        <a href="#" className="btnEditar" onClick="">Editar Perfil</a>
                    </div>
                    {/** Foto do Perfil */}
                    <div className="leftSide">
                        <img src={fotoPerfil} alt="..." className="ftPerfil" />
                    </div>
                </div>
                {/** Meus Grupos */}
                <div className="meusGrupos">
                    <p>Meus Grupos</p>
                    <div className="boxGrupos">
                        {/** aqui ficara o componente de cada bolinha referente ao grupo */}
                        <MeusG/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default perfilLateral;