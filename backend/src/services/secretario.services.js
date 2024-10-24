import secRepositories from "../repositories/secretarios.repositories.js";
import middleware from "../middlewares/global.middlewares.js";
import logger from "../logger/logger.mjs";

const createSec = async (body) => {
  logger.info("Iniciando criação do Secretário");
  const {nome, email, senha, confirm_senha, cpf } = body;

  if ( !nome || !email || !cpf || !senha || !confirm_senha){
    logger.error("Submeta todos os campos do registro")
    throw new Error("Submeta todos os campos do registro");
  }

  if(!middleware.validarCPF(cpf)) {
    logger.error("CPF inválido");
    throw new Error("CPF inválido");
  }
    
  const SecretarioExistente = await secRepositories.findByEmailSec(email);
  if (SecretarioExistente) {
    logger.error("Usuário existente no bando de Dados")
    throw new Error("Usuário existente no bando de Dados")
  };

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

  const user_secretario = await secRepositories.createSec(body);
  if (!user_secretario) {
    logger.error("Erro ao criar usuário");
    throw new Error("Erro ao criar usuário")
  };

  const token = middleware.genarateToken(user_secretario.id, 2);
  logger.info("Usuário criado com sucesso");
  
  return {
    user: {
      id: user_secretario.id,
      nome,
      email,
      cpf,
    },
    token,
  };
};

const findAllSec = async () => {
  logger.info("Buscando todos os Secretários");
  const users = await secRepositories.findAllSec();

  if (users.length === 0) {
    logger.error("Não há usuaários cadastrados!");
    throw new Error ("Não há usuaários cadastrados!")
  };

  logger.info("Secretários encontrados com sucesso");
  return users;
};

const findOne = async (id) =>{
  logger.info("Buscando Secretário por ID");
  const user = await secRepositories.findById(id);

  if(!user){
    logger.error("Usuário não encontrado");
    throw new Error("Usuário não encontrado");
  }

  logger.info("Usuário encontrado com sucesso");
  return user;
};

const loginSec = (email) => {
  logger.info(`Buscando usuário para login com email: ${email}`);
  return secRepositories.findByEmailSec(email).select('+senha');
};

const deleteSec = async (id) => {
  logger.info("Deletando secretário");
  const user = await secRepositories.findById(id);

  if (!user) {
    logger.info("Usuaário não encontrado");
    throw new Error("Usuaário não encontrado");
  }

  await secRepositories.deleteSec(id);
  logger.info("Usuário deletado com sucesso");
}

const updateSec = async (email, update) => {
  logger.info(`Atualizando usuário com email: ${email}`);
  const result =  secRepositories.patchDataSec(email, update);
  
  logger.info("Secretário atualizado com sucesso");
  return result;
};

export default {
  createSec,
  findAllSec,
  findOne,
  loginSec,
  deleteSec, 
  updateSec
};
