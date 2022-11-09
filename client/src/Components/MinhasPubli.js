import "./MinhasPubli.modules.css";
import ftPubli from "../img/it-takes-two.jpeg";
import blackheart from "../img/iconeHeart.png"
import emptyShare from "../img/emptyShare.png"
import emptyRepost from "../img/emptyRepost.png"

function MinhasPubli ({ texto, imagem, user }){
    //if (imagem === null) { imagem = pixel; }
    //let w = "350px";
    
    return(        
            <div className="boxPubli">
                <div className="tituloPubli">
                    <p>Minhas Publicações</p>
                </div>

                <div className="gradePosts">
                {/* Cabeçalho do post - informações do user */}
                <div className="cabPost">
                    <div className="nomeUserPost">
                        <button className="btnUser">
                            <a class="btnUser">@{user} • </a>
                        </button>
                    </div>
                    <div className="grupoUserPost">
                    </div>
                </div>
                {/* Corpo do post */}
                <div className="corpoPost">
                    <p className="texto">{texto}</p>
                    <img src={imagem} alt="..." />
                </div>                
                <div className="botoesPost">
                    <div className="botaoLike">
                        <button>
                            <img src={blackheart} />
                        </button>
                    </div>
                    <div className="botaoRepost">
                        <button>
                            <img src={emptyRepost} />
                        </button>
                    </div>
                    <div className="botaoShare">
                        <button>
                            <img src={emptyShare} />
                        </button>
                    </div>
                </div>
            </div>

            </div>        
    );
}

export default MinhasPubli;