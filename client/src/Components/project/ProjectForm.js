import "./ProjectForm.modules.css"
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForm({btnText}){
    return (
        <form className="form">
            <Input 
                type="text"
                text="Nome de Usuário ou Email"
                name="name"
                placeholder="Insira o nome de usuário ou email"
            />           
            <Input 
                type="password"
                text="Senha"
                name="senha"
                placeholder="Insira a senha"
           />

            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm;

/**
 *            <Select
                name="category_id"
                text="Selecione a categoria"
           />
 */