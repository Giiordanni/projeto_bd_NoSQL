import userServices from "../services/secretario.services.js";

const createSec = async (req, res) => {
  const body = req.body;
  try {
    const user = await userServices.createSec(body);
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findAllSec = async (req, res) => {
  try {
    const users = await userServices.findAllSec();
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findOneById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userServices.findOne(id);

    if (!user) {
      return res.status(404).sens({ message: "Usuário não encontrado" });
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const loginSec = async (req, res) => {
  const { email, senha} = req.body;

  if(!email || !senha ){
    return res.status(400).send({ message: "Email ou senha não informados!"});
  }

  try {
    const token = await userServices.loginSec(email, senha);
    return res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteSec = async (req, res) => {
  const {id} = req.params;

  try{
    const user = await userServices.deleteSec(id);
    res.status(200).send("Secretario deletado com sucesso");
  }catch(err){
    res.status(500).send({message: err.message});
  }
};

const updateSec = async (req, res) => {
  try{
    const {email} = req.body;
    const update = req.body;

    const result = await userServices.updateSec(email, update);

    if(result.modifiedCount === 0){
      return res.status(404).send({ message: 'Nenhuma modificação realizada' });
    }

    res.status(200).send({message: "Usuário atualizado com sucesso"});
  }catch(err){
    res.status(400).send({message:  'Erro ao atualizar médico', err});
  }
};

const logOutSec = async (req, res) => {
 try{
    req.user.tokens = req.user.tokens.filter((token) => {
      return token !== req.token;
    });
    await req.user.sabe();
    req.send();
  }catch(err){
    res.status(500).send(err); 
  }
};
  

export default {
  createSec,
  findAllSec,
  findOneById,
  loginSec,
  deleteSec,
  updateSec,
  logOutSec
};
