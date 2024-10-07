import medicoServices from "../services/medico_services.js";
import bcrypt from "bcrypt";

const create = async (req, res) => {
    const body = req.body;
    try{
        const user = await medicoServices.createMedico(body);
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

const findOne = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await medicoServices.findOne(email);

        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
        return res.send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const login = async (req, res) => {
    const { email, senha, confirm_senha } = req.body;

    try {
        const medico = await medicoServices.loginService(email);

        const senhaIsValid = bcrypt.compareSync(senha, medico.senha);

        if (!medico) {
            return res.status(404).send("Senha ou usuário inválidos!");
        }

        if (!medico.senha || !medico) {
            return res.status(400).send({ message: "Senha ou usuário inválidos!" });
        }

        if (senha !== confirm_senha) {
            return res.status(400).send({ message: "Senha ou usuário inválidos!" });
        }

        if (!senhaIsValid) {
            return res.status(400).send({ message: "Senha ou usuário inválidos!" });
        }

        const token = medicoServices.generateToken(medico.id);
        return res.send({ medico, token });
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

export default { create, findAllMedicos, findOne, login,  log_out, deletarMedico};