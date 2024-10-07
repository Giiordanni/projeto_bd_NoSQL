import medico_repositories from "../repositories/medico_repositories.js";
import medico from "../models/Medico.js";
import jwt from "jsonwebtoken";
import middleware from "../middlewares/global.middlewares.js";

const createMedico = async (body) => {
    const {nome, email, senha, confirm_senha, especialidade, cpf, data_nascimento, sexo, endereco, telefone} = body;

    if ( !nome || !email || !senha || !confirm_senha || !especialidade || !cpf || !data_nascimento || !sexo || !endereco || !telefone){
        throw new Error("Submeta todos os campos do registro");
    }

    const medico_existente = await medico_repositories.findByEmailMedico(email);
    if (medico_existente) throw new Error("Usuário já cadastrado no banco");

    if (senha !== confirm_senha) throw new Error("As senhas não coincidem");
    if (senha.length < 6) throw new Error("A senha deve ter no mínimo 6 caracteres");
    if (senha.length > 20) throw new Error("A senha deve ter no máximo 20 caracteres");

    try {
        await middleware.validEmail(body);
    } catch (error) {
        throw new Error(`Erro na validação do email: ${error.message}`);
    }

    const user_medico = await medico_repositories.createMedico(body);
    if (!user_medico) throw new Error("Erro ao criar usuário");

    const token = login.generateToken(user_medico.id);

    return {
        user: {
            id: user_medico.id,
            nome,
            email,
            cpf,
            data_nascimento,
            especialidade,
        },
        token,
    };
};

const findAllMedicos = async () => {
    const users = await medico_repositories.findAllMedicos();
    if (users.length === 0) throw new Error("Não há usuários cadastrados!");
    return users;
};

const findOne = async (email) => {
    const user = await medico_repositories.findByEmailMedico(email);
    return user;
};

const loginMedico = async (email) => {
    try {
        const user_medico = await medico
            .findOne({ email: email })
            .select("+senha");

        return user_medico;
    } catch (error) {
        throw new Error(error.message);
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 86400,
    });
};


export default {
    createMedico,
    findAllMedicos,
    findOne,
    loginMedico,
    generateToken,
};