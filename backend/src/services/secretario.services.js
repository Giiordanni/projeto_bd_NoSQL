import secRepositories from "../repositories/secretarios.repositories.js";
import jwt from "jsonwebtoken";
import middleware from "../middlewares/global.middlewares.js";

const createSec = async (body, role) => {

  const {nome, email, senha, confirm_senha, cpf } = body;

  if ( !nome || !email || !cpf || !senha || !confirm_senha){
    throw new Error("Submeta todos os campos do registro");
  }

  if(!middleware.validarCPF(cpf)) throw new Error("CPF inválido");
    
  const SecretarioExistente = await secRepositories.findByEmailSec(email);
  if (SecretarioExistente) throw new Error("Usuário existente no bando de Dados");

  if (senha !== confirm_senha) throw new Error("As senhas não coincidem");
  if (senha.length < 6 ) throw new Error("A senha deve ter no mínimo 6 caracteres");
  if (senha.length > 20 ) throw new Error("A senha deve ter no máximo 20 caracteres");

  try {
    await middleware.validarEmail(email);
  } catch (error) {
    throw new Error(`Erro na validação do email: ${error.message}`);
  }

  const user_secretario = await secRepositories.createSec(body);
  if (!user_secretario) throw new Error("Erro ao criar usuário");

  const token = genarateToken(user_secretario.id, role);
  
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
    const users = await secRepositories.findAllSec();
    if (users.length === 0) throw new Error ("Não há usuaários cadastrados!");
    return users;
    
};

const findOne = async (id) =>{
  const user = await secRepositories.findById(id);
  return user;
}

const loginSec = (email) => {
  return secRepositories.findByEmailSec(email).select('+senha');
};

const genarateToken = (user, role) => {
  return jwt.sign(
    { _id: user._id, role: role}, 
    process.env.SECRETJWT, { 
      expiresIn: 86400 
    }); // 24 horas em 
};

const deleteSec = async (id) => {
  const user = await secRepositories.findById(id);
  if (!user) throw new Error("Usuaário não encontrado");
  return secRepositories.deleteSec(id);
}

const updateSec = async (email, update) => {
  return secRepositories.patchDataSec(email, update);
};

export default {
  createSec,
  findAllSec,
  findOne,
  loginSec,
  genarateToken,
  deleteSec
};
