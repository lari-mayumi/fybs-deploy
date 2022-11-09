import React from "react";
import "./Modal.modules.css"

function ModalErroLogin(){

    const fecharMsg = () => {  
      localStorage.setItem("erro", 0);
    }

    return (
        <>
        <div className="popupSair">
                <div className="caixaSair">
                    <div className="tituloSair">
                        <p> Senha ou email incorretos!</p>
                    </div>
                    <div className="corpoSair">
                        <p> Verifique seus dados e tente novamente. </p>
                    </div>
                    <div className="caixaSairConfirma">
                        <button className="btnSairConfirma" onClick={fecharMsg}>
                            <p>Okay</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalErroLogin;