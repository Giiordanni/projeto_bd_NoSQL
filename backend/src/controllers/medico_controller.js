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

    try {
        const medico = await medicoServices.findByEspecialidadeMedico(especialidade);

        if (!medico) { 
            return res.status(404).send({ message: "Médico não encontrado" });
        }
        return res.status(200).send(medico);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const login = async (req, res) => {
    const {email, senha} = req.body;

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

        const token = medicoServices.generateToken(medico.id, "medico");
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
    const email = req.body;
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
        res.status(200).send(result);
    }catch (err) {
        res.status(400).send({ message: err.message });
    }
};

export default { create, findAllMedicos, findOneByEmail, findNome, login,  log_out, deletarMedico, updateMedico, findByEspecialidade};