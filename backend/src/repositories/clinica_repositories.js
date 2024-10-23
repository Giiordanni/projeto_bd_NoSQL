import clinica from "../models/Clinica.js";


const createClinica = (body) => clinica.create(body);
const findAllClinicas = () => clinica.find().lean();
const findByNomeMedico = (nome) => clinica.findOne({medicos: nome});
const findByEspecialidade = (especialidade) => clinica.find({especialidades: especialidade});
const findByNome = (nome) => clinica.findOne({nome: nome});
const deleteClinica = (id) => clinica.deleteOne({_id: id});
const patchDataClinica = (id, update) => clinica.updateOne({_id: id}, update, {new: true});

export default { createClinica, findAllClinicas, findByNomeMedico, findByEspecialidade, findByNome, deleteClinica, patchDataClinica };