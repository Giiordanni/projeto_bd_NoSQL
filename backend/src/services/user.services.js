import userRepositories from "../repositories/user.repositories.js";
import secretario from "../models/Secretario.js";
import jwt from "jsonwebtoken";
import mddleware from "../middlewares/global.middlewares.js"

const createServices = async (body) => {

  const {nome, sobrenome, email, telefone, cpf, data_nascimento, sexo, endereco, senha, confirm_senha} = body;

  if ( !nome || !sobrenome || !email || !telefone || !cpf || !data_nascimento || !sexo || !endereco || !senha || !confirm_senha){
    throw new Error("Submeta todos os campos do registro");
  }
    
  const usuarioExistente = await userRepositories.findByEmailRepositories(email);
  if (usuarioExistente) throw new Error("Usuário existente no bando de Dados");

  if (senha !== confirm_senha) throw new Error("As senhas não coincidem");

  if (senha.length < 6 ) throw new Error("A senha deve ter no mínimo 6 caracteres");
  if (senha.length > 20 ) throw new Error("A senha deve ter no máximo 20 caracteres");

  try {
    await mddleware.validEmail(body); // Aqui chamamos a função de validação de email com o corpo da requisição
  } catch (error) {
    throw new Error(`Erro na validação do email: ${error.message}`);
  }

  const user = await userRepositories.createRepositories(body);
  if (!user) throw new Error("Erro ao criar usuário");

  const token = login.genarateToken(user.id);
  return {
    user: {
      id: user.id,
      nome,
      sobrenome,
      email,
      cpf,
      data_nascimento,
    },
    token,
  };
};

const findAllSerices = async () => {
    const users = await userRepositories.findAllRepositories();
    if (users.length === 0) throw new Error ("Não há usuaários cadastrados!");
    return users;
    
};

const findOne = async (email) =>{
  const user = await userRepositories.findByEmailRepositories(email);
  return user;
}

const loginService = async (email) => {
  try {
    const user_secretario = await secretario
      .findOne({ email: email })
      .select("+senha");
    return user_secretario;
  } catch (error) {
    console.error("Erro ao buscar Usuário para login:", error);
    throw new Error(
      "Ocorreu um erro durante o login. Por favor, tente novamente mais tarde."
    );
  }
};

const genarateToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRETJWT, { expiresIn: 86400 }); // 24 horas em segundo


export default {
  createServices,
  findAllSerices,
  findOne,
  loginService,
  genarateToken
};
