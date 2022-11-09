import React from "react";
import "./Modal.modules.css"

function ModalIdade(){

    const fecharMsg = () => {  
      localStorage.setItem("erro", 0);
    }

    return (
        <>
        <div className="popupSair">
                <div className="caixaSair">
                    <div className="tituloSair">
                        <p> Menor de 13 anos</p>
                    </div>
                    <div className="corpoSair">
                        <p> Apenas pessoas com mais de 13 anos podem criar conta na fybs :'( </p>
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

export default ModalIdade;