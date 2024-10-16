import medico_repositories from "../repositories/medico_repositories.js";
import jwt from "jsonwebtoken";
import middleware from "../middlewares/global.middlewares.js";
import bcrypt from "bcrypt";


const createMedico = async (body, role) => {
    const {nome, email, senha, confirm_senha, especialidade, coren, cpf} = body;

    if ( !nome || !email || !senha || !confirm_senha || !especialidade || !coren || !cpf){
        throw new Error("Submeta todos os campos do registro");
    }

    if(!middleware.validarCPF(cpf)) throw new Error("CPF inválido");

    const medico_existente = await medico_repositories.findByEmailMedico(email);
    if (medico_existente) throw new Error("Usuário já cadastrado no banco");

    if (senha !== confirm_senha) throw new Error("As senhas não coincidem");
    if (senha.length < 6) throw new Error("A senha deve ter no mínimo 6 caracteres");
    if (senha.length > 20) throw new Error("A senha deve ter no máximo 20 caracteres");
    
    try {
        await middleware.validarEmail(email);
    } catch (error) {
        throw new Error(`Erro na validação do email: ${error.message}`);
    }

    const user_medico = await medico_repositories.createMedico(body);
    if (!user_medico) throw new Error("Erro ao criar usuário");

    const token = generateToken(user_medico, role);

    return {
        user: {
            id: user_medico._id,
            nome,
            email,
            especialidade,
        },
        token,
    };
};

const deletarMedico = async (body) => {
    const { email } = body;
    const user = await medico_repositories.findByEmailMedico(email);
    if (!user) throw new Error("Usuário não encontrado");
    await medico_repositories.deletarMedico(email);
    return user;
};

const getAllMedicos = async () => {
    const medicos = await medico_repositories.findAllMedicos();
    if (medicos.length === 0) throw new Error("Não há médicos cadastrados!");
    if (!medicos) throw new Error("Usuário não encontrado");
    return medicos;
};

const findEmailOne = async (email) => {
    if (!email) {
        throw new Error("Email não fornecido");
    }
    const user = await medico_repositories.findByEmailMedico(email);
    if (!user) {
        throw new Error("Nenhum usuário encontrado");
    }
    return user;
};

const findName = async (nome) => {
    if (!nome) {
        throw new Error("Nome não fornecido");
    }
    const medico = await medico_repositories.findByNomeMedico(nome); // .select("+senha") se colocar isso daqui vai mostrar a senha na requisicao
    if (!medico.length) {
        throw new Error("Nenhum usuário encontrado");
    }
    return medico;
}

const findEspecialidade = async (especialidade) => {
    if (!especialidade) {
        throw new Error("Especialidade não fornecida");
    }
    const medico = await medico_repositories.findByEspecialidadeMedico(especialidade);
    if (!medico.length) {
        throw new Error("Nenhum usuário encontrado");
    }
    return medico;
};

const loginMedico = async (email) => {
    return medico_repositories.findByEmailMedico(email).select("+senha");
};

const generateToken = (user, role) => {
    return jwt.sign(
        { _id: user._id, role: role }, 
        process.env.SECRETJWT, {
            expiresIn: 86400, // 24 horas
    });
};

const atualizarMedico = async (email, update) => {
    const user_medico = await medico_repositories.findByEmailMedico(email);
    if (!user_medico) throw new Error("Usuário não encontrado");
    const updateMedico = await medico_repositories.atualizarDadosMedico(email, update);
    return updateMedico;
};


export default {
    createMedico,
    getAllMedicos,
    findEmailOne,
    findName, 
    loginMedico,
    generateToken,
    deletarMedico,
    atualizarMedico, 
    findEspecialidade
};