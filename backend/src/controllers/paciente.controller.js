import pacienteServices from '../services/paciente.services.js';
import bcrypt from 'bcrypt';

const create = async (req, res) => {
  const body = req.body;
  try {
    const user = await pacienteServices.createPaciente(body);
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

const findAll = async (req, res) => {
  try {
    const users = await pacienteServices.findAllPacientes();
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

const findOne = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await pacienteServices.findOne(email);

    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

const login = async (req, res) => { 
  const { email, senha, confirm_senha } = req.body;

  try {
    const paciente = await pacienteServices.loginPaciente(email);

    const senhaIsValid = bcrypt.compareSync(senha, paciente.senha);

    if (!paciente) {
      return res.status(404).send('Senha ou usuário inválidos!');
    }

    if (!paciente.senha || !paciente) {
      return res.status(400).send({ message: 'Senha ou usuário inválidos!' });
    }

    if (senha !== confirm_senha) {
      return res.status(400).send({ message: 'Senha ou usuário inválidos!' });
    }

    if (!senhaIsValid) {
      return res.status(400).send({ message: 'Senha ou usuário inválidos!' });
    }

    return res.send({ message: 'Usuário logado com sucesso!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export default {
  create,
  findAll,
  findOne,
  login,
};