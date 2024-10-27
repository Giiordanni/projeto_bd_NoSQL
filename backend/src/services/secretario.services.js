import secRepositories from "../repositories/secretarios.repositories.js";
import middleware from "../middlewares/global.middlewares.js";
import logger from "../logger/logger.mjs";
import CustomError from "../error/error.js";
import bcrypt from "bcrypt";

const createSec = async (body) => {
  logger.info("Iniciando criação do Secretário");
  const {nome, email, senha, confirm_senha, cpf } = body;

  if ( !nome || !email || !cpf || !senha || !confirm_senha){
    logger.error("Submeta todos os campos do registro")
    throw new CustomError("Submeta todos os campos do registro", 400);
  }

  if(!middleware.validarCPF(cpf)) {
    logger.error("CPF inválido");
    throw new CustomError("CPF inválido", 404);
  }

  const emailIsValid = await middleware.validarEmail(email);
  if(!emailIsValid){
    logger.error("Email inválido");
    throw new CustomError("Email inválido", 404);
  }
    
  const SecretarioExistente = await secRepositories.findByEmailSec(email);
  if (SecretarioExistente) {
    logger.error("Usuário existente no bando de Dados")
    throw new CustomError("Usuário existente no bando de Dados", 401)
  };

  if (senha !== confirm_senha) {
    logger.error("As senhas não coincidem");
    throw new CustomError("As senhas não coincidem", 401);
  }
  if (senha.length < 6) {
    logger.error("A senha deve ter no mínimo 6 caracteres");
    throw new CustomError("A senha deve ter no mínimo 6 caracteres", 401);
  }
  if (senha.length > 20) {
    logger.error("A senha deve ter no máximo 20 caracteres");
    throw new CustomError("A senha deve ter no máximo 20 caracteres", 401);
  }

  const user_secretario = await secRepositories.createSec(body);
  if (!user_secretario) {
    logger.error("Erro ao criar usuário");
    throw new CustomError("Erro ao criar usuário", 400)
  };

  const token = middleware.genarateToken({_id: user_secretario.id}, 2);
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
    throw new CustomError("Não há usuaários cadastrados!", 400)
  };

  logger.info("Secretários encontrados com sucesso");
  return users;
};

const findOne = async (id) =>{
  logger.info("Buscando Secretário por ID");
  const user = await secRepositories.findById(id);

  if(!user){
    logger.error("Usuário não encontrado");
    throw new CustomError("Usuário não encontrado", 401);
  }

  logger.info("Usuário encontrado com sucesso");
  return user;
};

const loginSec = async (email, senha) => {
  logger.info("Fazendo login do Secretário");
  logger.info(`Buscando usuário para login com email: ${email}`);
  const secretario = await secRepositories.findByEmailSec(email).select('+senha');

  if (!secretario) {
    logger.error("Usuário não encontrado");
    throw new CustomError("Usuário não encontrado", 401);
  }

  const senhaIsValid = bcrypt.compareSync(String(senha), String(secretario.senha));

  if (!senhaIsValid) {
    logger.error("Senha inválida");
    throw new CustomError("Senha inválida", 401);
  }

  const token = middleware.genarateToken({_id: secretario.id}, 2);
  logger.info("Usuário logado com sucesso");
  return token;
};

const deleteSec = async (id) => {
  logger.info("Deletando secretário");
  const user = await secRepositories.findById(id);

  if (!user) {
    logger.info("Usuaário não encontrado");
    throw new CustomError("Usuaário não encontrado", 404);
  }

  const secretarioIsDelete = await secRepositories.deleteSec(id);
  if(!secretarioIsDelete){
    logger.error("Erro ao deletar usuário");
    throw new CustomError("Erro ao deletar usuário", 400);
  }

  logger.info("Usuário deletado com sucesso");
}

const updateSec = async (id, update) => {
  logger.info(`Atualizando usuário com email: ${id}`);

  const user = await secRepositories.findById(id);
  if(!user){
    logger.error("Usuário não encontrado");
    throw new CustomError("Usuário não encontrado", 404);
  }
  
  const result =  await secRepositories.patchDataSec(id, update);
  if(!result){
    logger.error("Erro ao atualizar usuário");
    throw new CustomError("Erro ao atualizar usuário", 400);
  }

  if(result.modifiedCount === 0){
    logger.error("Nenhuma modificação realizada");
    throw new CustomError("Nenhuma modificação realizada", 400);
  }

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
