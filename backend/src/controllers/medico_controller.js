import medicoServices from "../services/medico_services.js";
import bcrypt from "bcrypt";

const create = async (req, res) => {
    const {role} = req.query;
    const body = req.body;
    try{
        const user = await medicoServices.createMedico(body, role);
        return res.status(201).send(user);
    }catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findAllMedicos = async (req, res) => {
    try {
        const medicos = await medicoServices.getAllMedicos();
        res.status(200).send(medicos);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

const findOneByEmail = async (req, res) => {
    const { email } = req.query;

    if(!email){
        return res.status(400).send({ message: "Email não informado" });
    }

    try {
        const user = await medicoServices.findEmailOne(email);

        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findNome = async (req, res) => {
    const {nome} = req.query;

    if(!nome){
        res.status(400).send({ message: "Nome não informado" });
    }

    try{
        const medico = await medicoServices.findName(nome);

        if(!medico){
            return res.status(404).send({ message: "Médico não encontrado"});
        }
        return res.status(200).send(medico);
    }catch(err){
        return res.status(500).send({ message: err.message });
    }
};

const findByEspecialidade = async (req, res) => {
    const { especialidade } = req.query;

    if(!especialidade){
        return res.status(400).send({ message: "Especialidade não informada" });   
    }

    try {
        const medico = await medicoServices.findEspecialidade(especialidade);

        if (!medico) { 
            return res.status(404).send({ message: "Médico não encontrado" });
        }
        return res.status(200).send(medico);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const findById = async (req, res) => {
    const  id  = req.params;

    if(!id){
        return res.status(400).send({ message: "Id não informado" });
    }

    try{
        const medico = await medicoServices.findById(id);

        if(!medico){
            return res.status(404).send({ message: "Médico não encontrado"});
        }
        return res.status(200).send(medico);
    }catch(err){   
        return res.status(500).send({ message: err.message });
    }
};

const login = async (req, res) => {
    const {email, senha} = req.body;

    if (!email || !senha) {
        return res.status(400).send({ message: "Email ou senha não informados!" });
    }

    try {
        const medico = await medicoServices.loginMedico(email);

        const senhaIsValid = bcrypt.compareSync(String(senha), String(medico.senha));

        if (!medico) {
            return res.status(404).send({ message: "Senha ou usuário inválidos!" });
        }

        if (!medico.senha || !medico) {
            return res.status(400).send({ message: "Senha ou usuário inválidos!" });
        }

        if (!senhaIsValid) {
            return res.status(400).send({ message: "Senha ou usuário inválidos!" });
        }

        const token = medicoServices.generateToken(medico.id, 1);
        return res.send({token});
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const log_out = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
};

const deletarMedico = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        return res.status(400).send({ message: "Email não informado" });
    }
    
    try {
        const deletar = await medicoServices.deletarMedico(email);
        res.status(200).send("Médico deletado com sucesso!");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const updateMedico = async (req, res) => {
    try {
        const {email} = req.body; // desestruturando o email do corpo da requisição
        const update = req.body;
        const result = await medicoServices.atualizarMedico(email, update);

        if(result.matchedCount === 0){
            return res.status(404).send({ message: 'Médico não encontrado' });
        }
        if(result.modifiedCount === 0){
            return res.status(404).send({ message: 'Nenhuma modificação realizada' });
        }
        res.status(200).send({ message: 'Médico atualizado com sucesso' });
    }catch (err) {
        res.status(400).send({ message: 'Erro ao atualizar médico', err});
    }
};

export default { create, findAllMedicos, findOneByEmail, findNome, login,  log_out, deletarMedico, updateMedico, findByEspecialidade, findById };