import userServices from "../services/secretario.services.js";
import bcrypt from "bcrypt";

const create = async (req, res) => {
  const body = req.body;
  try {
    const user = await userServices.createServices(body);
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userServices.findAllSerices();
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findOne = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await userServices.findOne(email);

    if (!user) {
      return res.status(404).sens({ message: "Usuário não encontrado" });
    }
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, senha, confirm_senha } = req.body;

  try {
    const secretario = await userServices.loginService(email);

    const senhaIsValid = bcrypt.compareSync(senha, secretario.senha);

    if (!secretario) {
      return res.status(404).send("Senha ou usuário inválidos!");
    }

    if (!secretario.senha || !secretario) {
      return res.status(400).send({ message: "Senha ou usuário inválidos!" });
    }

    if (senha !== confirm_senha) {
      return res.status(400).send({ message: "Senha ou usuário inválidos!" });
    }

    if (!senhaIsValid) {
      return res.status(400).send({ message: "Senha ou usuário inválidos!" });
    }

    const token = userServices.genarateToken(secretario.id);
    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  create,
  findAll,
  findOne,
  login,
};
