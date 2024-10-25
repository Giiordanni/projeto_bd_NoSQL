import medico_repositories from "../repositories/medico_repositories.js";
import middleware from "../middlewares/global.middlewares.js";
import logger from "../logger/logger.mjs";
import CustomError from "../error/error.js";
import bcrypt from "bcrypt";


const createMedico = async (body) => {
    logger.info("Iniciando criação do Médico");
    const {nome, email, senha, confirm_senha, especialidade, cpf} = body;

    if ( !nome || !email || !senha || !confirm_senha || !especialidade || !cpf){
        logger.error("Submeta todos os campos do registro")
        throw new CustomError("Submeta todos os campos do registro", 401);
    }

    if(!middleware.validarCPF(cpf)) {
        logger.error("CPF inválido");
        throw new CustomError("CPF inválido", 400);
    }

    if (await medico_repositories.findByEmailMedico(email)) {
        logger.error("Usuário já cadastrado no banco");
        throw new CustomError("Usuário já cadastrado no banco", 400);
    }

    if (await medico_repositories.findByCpf(cpf)){
        logger.error("CPF já cadastrado no banco");
        throw new CustomError("CPF já cadastrado no banco", 400);
    }

    if (senha !== confirm_senha) {
        logger.error("As senhas não coincidem"); 
        throw new CustomError("As senhas não coincidem", 400);
    }
    if (senha.length < 6) {
        logger.error("A senha deve ter no mínimo 6 caracteres");
        throw new CustomError("A senha deve ter no mínimo 6 caracteres", 400);
      }
    if (senha.length > 20) {
        logger.error("A senha deve ter no máximo 20 caracteres");
        throw new CustomError("A senha deve ter no máximo 20 caracteres", 400);
    }
    
    const validEmail = await middleware.validarEmail(email);
    if(!validEmail){
        logger.error("Email inválido");
        throw new CustomError("Email inválido", 400);
    }
    
    const user_medico = await medico_repositories.createMedico(body);
    if (!user_medico) {
        logger.error("Erro ao criar usuário");
        throw new CustomError("Erro ao criar usuário", 400);
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
        throw new CustomError("Usuário não encontrado", 401);
    }

    const deletarMedico = await medico_repositories.deletarMedico(email);
    if(!deletarMedico){
        logger.error("Erro ao deletar usuário");
        throw new CustomError("Erro ao deletar usuário", 400);
    }

    logger.info("Usuário deletado com sucesso");
    return deletarMedico;
};

const getAllMedicos = async () => {
    logger.info("Buscando todos os médicos");
    const medicos = await medico_repositories.findAllMedicos();

    if (medicos.length === 0) {
        logger.error("Não há médicos cadastrados!");
        throw new CustomError("Não há médicos cadastrados!", 404);
    }
    if (!medicos) {
        logger.error("Usuário não encontrado");
        throw new CustomError("Usuário não encontrado", 404);
    }

    logger.info("Médicos encontrados com sucesso");
    return medicos;
};

const findEmailOne = async (email) => {
    logger.info("Buscando médico por email");
    const user = await medico_repositories.findByEmailMedico(email);

    if (!user) {
        logger.error("Usuário não encontrado");
        throw new CustomError("Nenhum usuário encontrado", 404);
    }

    logger.info("Usuário encontrado com sucesso");
    return user;
};

const findName = async (nome) => {
    logger.info("Buscando médico por nome");
    const medico = await medico_repositories.findByNomeMedico(nome); // .select("+senha") se colocar isso daqui vai mostrar a senha na requisicao

    if (!medico.length) {
        logger.error("Nenhum usuário encontrado");
        throw new CustomError("Nenhum usuário encontrado", 404);
    }

    logger.info("Usuário encontrado com sucesso");
    return medico;
}

const findById = async (id) => {
    logger.info("Buscando médico por id");
    const medico = await medico_repositories.findById(id);

    if (!medico) {
        logger.error("Nenhum usuário encontrado");
        throw new CustomError("Nenhum usuário encontrado", 404);
    }

    logger.info("Usuário encontrado com sucesso");
    return medico;
}

const findEspecialidade = async (especialidade) => {
    logger.info("Buscando médico por especialidade");
    const medico = await medico_repositories.findByEspecialidadeMedico(especialidade);

    if (!medico.length) {
        logger.error("Nenhum usuário encontrado"); 
        throw new CustomError("Nenhum usuário encontrado", 404);
    }

    logger.info("Usuário encontrado com sucesso");
    return medico;
};

const loginMedico = async (email, senha) => {
    logger.info("Fazendo login do médico");
    logger.info(`Buscando médico para login com email: ${email}`);

    const medico =  await medico_repositories.findByEmailMedico(email).select("+senha");

    if(!medico){
        logger.error("Usuário não encontrado");
        throw new CustomError("Usuário não encontrado", 400);
    }

    const senhaIsValid = bcrypt.compareSync(String(senha), String(medico.senha));

    if (!senhaIsValid) {
        logger.error("Senha inválida");
        throw new CustomError("Senha inválida", 400);
    }

    const token = middleware.genarateToken(medico.id, 1);
    return token;
};

const atualizarMedico = async (email, update) => {
    logger.info("Atualizando médico");
    const user_medico = await medico_repositories.findByEmailMedico(email);

    if (!user_medico) {
        logger.error("Usuário não encontrado");
        throw new CustomError("Usuário não encontrado", 404);
    }

    const updateMedico = await medico_repositories.atualizarDadosMedico(email, update);
    if (!updateMedico) {
        logger.error("Erro ao atualizar usuário");
        throw new CustomError("Erro ao atualizar usuário", 404);
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