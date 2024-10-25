import pacienteServices from '../services/paciente.services.js';


const create = async (req, res) => {
  const body = req.body;
  try {
    const user = await pacienteServices.createPaciente(body);
    return res.status(201).send({message: "Usuário criado com sucesso", user});
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }

}

const findAll = async (req, res) => {
  try {
    const users = await pacienteServices.findAllPacientes();
    return res.send({message: "Pacientes encontrados com sucesso", users});
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};

const findOne = async (req, res) => {
  const { email } = req.params;

  if(!email){
    return res.status(400).send({message: "Email não informado"});
  }

  try {
    const user = await pacienteServices.findOneByEmail(email);

    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    return res.status(200).send({message: "Usuário encontrado com sucesso", user});
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};

const login = async (req, res) => { 
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send({ message: "Email ou senha não informados!" });
  }

  try {
    const token = await pacienteServices.loginPaciente(email, senha);
    return res.status(200).send({ message: 'Usuário logado com sucesso!', token});
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};

const deletePaciente = async (req, res) => {
  const  PacienteId  = req.userId;
  console.log(PacienteId);
  try {  
    const deletePaciente = await pacienteServices.deletePaciente({_id: PacienteId});
    return res.status(200).send({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};

const patchPaciente = async (req, res) => {
  const PacienteId = req.userId;
  const update = req.body;

  if (!update || Object.keys(update).length === 0) {
    return res.status(400).send({ message: "Nenhum dado informado no body" });
  }

  try {
    const updatePaciente = await pacienteServices.patchPaciente({_id: PacienteId}, update);

    if(updatePaciente.modifiedCount === 0){
      return res.status(404).send({ message: 'Nenhuma modificação realizada' });
    }

    return res.status(200).send({ message: "Usuário atualizado com sucesso", updatePaciente });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({ message: err.message });
  }
};


export default {
  create,
  findAll,
  findOne,
  login,
  deletePaciente,
  patchPaciente
};