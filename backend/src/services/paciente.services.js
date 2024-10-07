import pacienteRepositories from "../repositories/paciente.repositories.js";
import paciente from "../models/Paciente.js";
import jwt from "jsonwebtoken";
import midd from "../middlewares/global.middlewares.js";

const createPaciente = async (body) => {
  const { nome, email, senha, confirm_senha, data_nascimento, sexo, endereco, telefone } = body;

  if ( !nome || !email || !senha || !confirm_senha || !telefone || !data_nascimento || !sexo || !endereco ) {
    throw new Error("Submeta todos os campos do registro");
  }

  const paciente_existe = await pacienteRepositories.findByEmailPaciente(email);
  if (paciente_existe) throw new Error("Usuário já cadastrado no banco");

  if (senha !== confirm_senha) throw new Error("As senhas não coincidem");
  if (senha.length < 6)
    throw new Error("A senha deve ter no mínimo 6 caracteres");
  if (senha.length > 20)
    throw new Error("A senha deve ter no máximo 20 caracteres");

  try {
    await midd.validEmail(body);
  } catch (error) {
    throw new Error(`Erro na validação do email: ${error.message}`);
  }

  const user_paciente = await pacienteRepositories.createPaciente(body);
  if (!user_paciente) throw new Error("Erro ao criar usuário");

  const token = login.generateToken(user_paciente.id);

  return {
    user: {
      id: user_paciente.id,
      nome,
      email,
      data_nascimento,
      sexo,
      endereco,
      telefone,
    },
    token,
  };
};

const findAllPacientes = async () => {
  const users = await pacienteRepositories.findAllPacientes();
  if (users.length === 0) throw new Error("Não há usuários cadastrados!");
  return users;
};

const findOne = async (email) => {
  const user = await pacienteRepositories.findByEmailPaciente(email);
  return user;
};

const loginPaciente = async (email) => {
  try {
    const user_paciente = await paciente
      .findOne({ email: email })
      .select("+senha");
    if (!user_paciente) throw new Error("Usuário não encontrado");
    return user_paciente;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário: ${error.message}`);
  }
};

const generateToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET, { expiresIn: 86400 });

export default {
  createPaciente,
  findAllPacientes,
  findOne,
  loginPaciente,
  generateToken,
};
