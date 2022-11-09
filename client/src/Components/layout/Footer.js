import "./Footer.modules.css"
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
    return (
        <footer className="footerF">
            <div className="boxFooter">
                <button className="btnSobre">Sobre</button>
                <button className="btnTermos">Termos de Condições Gerais</button>
                <button className="btnPriva">Termos de Privacidade</button>
            </div>
            <div className="boxCopy">
                <button className="btnCopy">Copyright © Fybs 2022</button>
            </div>
        </footer>
    )
}

export default Footer;
