import medico_repositories from "../repositories/medico_repositories.js";
import jwt from "jsonwebtoken";
import middleware from "../middlewares/global.middlewares.js";
import logger from "../logger/logger.mjs";


const createMedico = async (body) => {
    logger.info("Iniciando criação do Médico");
    const {nome, email, senha, confirm_senha, especialidade, cpf} = body;

    if ( !nome || !email || !senha || !confirm_senha || !especialidade || !cpf){
        logger.error("Submeta todos os campos do registro")
        throw new Error("Submeta todos os campos do registro");
    }

    if(!middleware.validarCPF(cpf)) {
        logger.error("CPF inválido");
        throw new Error("CPF inválido");
    }

    if (await medico_repositories.findByEmailMedico(email)) {
        logger.error("Usuário já cadastrado no banco");
        throw new Error("Usuário já cadastrado no banco");
    }

    if (await medico_repositories.findByCpf(cpf)){
        logger.error("CPF já cadastrado no banco");
        throw new Error("CPF já cadastrado no banco");
    }

    if (senha !== confirm_senha) {
        logger.error("As senhas não coincidem"); 
        throw new Error("As senhas não coincidem");
    }
    if (senha.length < 6) {
        logger.error("A senha deve ter no mínimo 6 caracteres");
        throw new Error("A senha deve ter no mínimo 6 caracteres");
      }
      if (senha.length > 20) {
        logger.error("A senha deve ter no máximo 20 caracteres");
        throw new Error("A senha deve ter no máximo 20 caracteres");
      }
    
    try {
        await middleware.validarEmail(email);
    } catch (error) {
        logger.error(`Erro na validação do email: ${error.message}`);
        throw new Error(`Erro na validação do email: ${error.message}`);
    }


    const user_medico = await medico_repositories.createMedico(body);
    if (!user_medico) {
        logger.error("Erro ao criar usuário");
        throw new Error("Erro ao criar usuário");
    }

    const token = middleware.genarateToken(user_medico, 1);
    logger.info("Usuário criado com sucesso");

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

const deletarMedico = async (email) => {
    logger.info("Deletando médico");
    const user = await medico_repositories.findByEmailMedico(email);

    if (!user) {
        logger.error("Usuário não encontrado");
        throw new Error("Usuário não encontrado");
    }
    await medico_repositories.deletarMedico(email);
    logger.info("Usuário deletado com sucesso");
};

const getAllMedicos = async () => {
    logger.info("Buscando todos os médicos");
    const medicos = await medico_repositories.findAllMedicos();

    if (medicos.length === 0) {
        logger.error("Não há médicos cadastrados!");
        throw new Error("Não há médicos cadastrados!");
    }
    if (!medicos) {
        logger.error("Usuário não encontrado");
        throw new Error("Usuário não encontrado");
    }

    logger.info("Médicos encontrados com sucesso");
    return medicos;
};

const findEmailOne = async (email) => {
    logger.info("Buscando médico por email");
    const user = await medico_repositories.findByEmailMedico(email);

    if (!user) {
        logger.error("Usuário não encontrado");
        throw new Error("Nenhum usuário encontrado");
    }

    logger.info("Usuário encontrado com sucesso");
    return user;
};

const findName = async (nome) => {
    logger.info("Buscando médico por nome");
    const medico = await medico_repositories.findByNomeMedico(nome); // .select("+senha") se colocar isso daqui vai mostrar a senha na requisicao

    if (!medico.length) {
        logger.error("Nenhum usuário encontrado");
        throw new Error("Nenhum usuário encontrado");
    }

    logger.info("Usuário encontrado com sucesso");
    return medico;
}

const findById = async (id) => {
    logger.info("Buscando médico por id");
    const medico = await medico_repositories.findById(id);

    if (!medico) {
        logger.error("Nenhum usuário encontrado");
        throw new Error("Nenhum usuário encontrado");
    }

    logger.info("Usuário encontrado com sucesso");
    return medico;
}

const findEspecialidade = async (especialidade) => {
    logger.info("Buscando médico por especialidade");
    const medico = await medico_repositories.findByEspecialidadeMedico(especialidade);

    if (!medico.length) {
        logger.error("Nenhum usuário encontrado"); 
        throw new Error("Nenhum usuário encontrado");
    }

    logger.info("Usuário encontrado com sucesso");
    return medico;
};

const loginMedico = async (email) => {
    logger.info(`Buscando médico para login com email: ${email}`);
    return medico_repositories.findByEmailMedico(email).select("+senha");
};

const atualizarMedico = async (email, update) => {
    logger.info("Atualizando médico");
    const user_medico = await medico_repositories.findByEmailMedico(email);

    if (!user_medico) {
        logger.error("Usuário não encontrado");
        throw new Error("Usuário não encontrado");
    }

    const updateMedico = await medico_repositories.atualizarDadosMedico(email, update);
    if (!updateMedico) {
        logger.error("Erro ao atualizar usuário");
        throw new Error("Erro ao atualizar usuário");
    }

    logger.info("Usuário atualizado com sucesso");
    return updateMedico;
};


export default {
    createMedico,
    getAllMedicos,
    findEmailOne,
    findName, 
    loginMedico,
    deletarMedico,
    atualizarMedico, 
    findEspecialidade,
    findById
};