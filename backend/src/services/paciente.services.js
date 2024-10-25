import pacienteRepositories from "../repositories/paciente.repositories.js";
import customError from "../error/error.js";
import bcrypt from "bcrypt";
import globalMiddlewares from "../middlewares/global.middlewares.js";
import logger from "../logger/logger.mjs";


const createPaciente = async (body) => {
  logger.info("Iniciando criação do Paciente");
  const { nome, email, senha, confirm_senha, cpf } = body;

  if ( !nome || !email || !senha || !confirm_senha || !cpf ) {
    logger.error("Submeta todos os campos do registro");
    throw new customError("Submeta todos os campos do registro", 401);
  }

  if(!globalMiddlewares.validarCPF(cpf)){
    logger.error("CPF inválido");
    throw new customError("CPF inválido", 400);
  }

  const validEmail = await globalMiddlewares.validarEmail(email)
  if(!validEmail){
    logger.error("Email inválido");
    throw new customError("Email inválido", 400);
  }
  
  const paciente_existe = await pacienteRepositories.findByEmailPaciente(email);
  if (paciente_existe) {
    logger.error("Usuário já cadastrado no banco");
    throw new customError("Usuário já cadastrado no banco", 400);
  }

  if (senha !== confirm_senha) {
    logger.error("As senhas não coincidem");
    throw new customError("As senhas não coincidem", 400);
  }
  if (senha.length < 6) {
    logger.error("A senha deve ter no mínimo 6 caracteres");
    throw new customError("A senha deve ter no mínimo 6 caracteres", 400);
  }
  if (senha.length > 20){
    logger.error("A senha deve ter no máximo 20 caracteres");
    throw new customError("A senha deve ter no máximo 20 caracteres", 400);
  }

  const user_paciente = await pacienteRepositories.createPaciente(body);
  if (!user_paciente) {
    logger.error("Erro ao criar usuário");
    throw new Error("Erro ao criar usuário");
  }

  console.log(user_paciente.id);
  const token = globalMiddlewares.genarateToken({_id: user_paciente.id}, 3);
  return {
    user: {
      id: user_paciente._id,
      nome,
      email,
      cpf,
    },
    token,
  };
};

const findAllPacientes = async () => {
  logger.info("Buscando todos os pacientes");

  const users = await pacienteRepositories.findallPacientes();
  if (users.length === 0){
    logger.error("Não há usuários cadastrados!");
    throw new customError("Não há usuários cadastrados!", 400)};

  return users;
};

const findOneByEmail = async (email) => {
  logger.info("Buscando paciente por email");

  const user = await pacienteRepositories.findByEmailPaciente(email);
  if (!user) {
    logger.error("Usuário não encontrado");
    throw new customError("Usuário não encontrado", 400);
  }

  return user;
};

const loginPaciente = async (email, senha) => {
  logger.info("Fazendo login do médico");
  logger.info(`Buscando médico para login com email: ${email}`);

  const paciente = await pacienteRepositories.findByEmailPaciente(email).select("+senha");

  if(!paciente){
    logger.error("Usuário não encontrado");
    throw new customError("Usuário não encontrado", 400);
  }

  const senhaIsValid = bcrypt.compareSync(String(senha), String(paciente.senha));
  if(!senhaIsValid){
    logger.error("Senha inválida");
    throw new customError("Senha inválida", 400);
  }

  console.log(paciente.id);
  const token = globalMiddlewares.genarateToken({_id: paciente.id}, 3);
  return token;
  
};

const deletePaciente = async (id) => {
  logger.info("Deletando paciente");

  const user = await pacienteRepositories.finfById(id);

  if (!user) {
    logger.error("Usuário não encontrado");
    throw new customError("Usuário não encontrado", 404);
  }

  const deletePaciente = await pacienteRepositories.deletePaciente(id);
  if(!deletePaciente){
    logger.error("Erro ao deletar usuário");
    throw new customError("Erro ao deletar usuário", 400);
  }

  return deletePaciente;
}

const patchPaciente = async (id, update) =>  {
  logger.info("Atualizando dados do paciente");

  const user_paciente = await pacienteRepositories.finfById(id);
  if(!user_paciente){
    logger.error("Usuário não encontrado");
    throw new customError("Usuário não encontrado", 404);
  }

  const updatePaciente = await pacienteRepositories.putPaciente(id, update);
  if(!updatePaciente){
    logger.error("Erro ao atualizar usuário");
    throw new customError("Erro ao atualizar usuário", 404);
  }

  console.log(updatePaciente);

  logger.info("Usuário atualizado com sucesso");
  return updatePaciente;
}


export default {
  createPaciente,
  findAllPacientes,
  findOneByEmail,
  loginPaciente,
  deletePaciente,
  patchPaciente
};
