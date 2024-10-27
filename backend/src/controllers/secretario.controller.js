import userServices from "../services/secretario.services.js";

const createSec = async (req, res) => {
  const body = req.body;

  try {
    const user = await userServices.createSec(body);
    return res.status(201).send({message: "Secretário criado com sucesso", user});
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};

const findAllSec = async (req, res) => {
  try {
    const users = await userServices.findAllSec();
    return res.status(200).send({message: "Secretários encontrados com sucesso", users});
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};

const findOneById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userServices.findOne(id);
    return res.status(200).send({message: "Usuário encontrado com sucesso", user});
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};

const loginSec = async (req, res) => {
  const { email, senha} = req.body;

  if(!email || !senha ){
    return res.status(400).send({ message: "Email ou senha não informados!"});
  }

  try {
    const token = await userServices.loginSec(email, senha);
    return res.status(200).send({message: "login feito com sucesso", token });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};

const deleteSec = async (req, res) => {
  const id = req.userId;

  try{
    const user = await userServices.deleteSec(id);
    res.status(200).send({message: "Secretario deletado com sucesso"});
  }catch(err){
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};

const updateSec = async (req, res) => {
  try{
    const id = req.userId;
    const update = req.body;

    const result = await userServices.updateSec(id, update);
    res.status(200).send({message: "Usuário atualizado com sucesso", result});
  }catch(err){
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};


export default {
  createSec,
  findAllSec,
  findOneById,
  loginSec,
  deleteSec,
  updateSec
};
