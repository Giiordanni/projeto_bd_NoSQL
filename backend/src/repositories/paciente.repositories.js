import Paciente from "../models/Paciente.js";

const createPaciente = (body) => Paciente.create(body);
const findByEmailPaciente = (email) => Paciente.findOne({email: email})
const finfById = (id) => Paciente.findById(id);
const findallPacientes = () => Paciente.find();
const deletePaciente = (id) => Paciente.deleteOne({_id: id})
const putPaciente = (id, update) => Paciente.updateOne(id, update, {new: true})



export default {createPaciente, findByEmailPaciente, finfById, findallPacientes, deletePaciente, putPaciente};