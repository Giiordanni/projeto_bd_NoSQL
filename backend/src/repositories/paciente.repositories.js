import Paciente from "../models/Paciente.js";

const createPaciente = (body) => Paciente.create(body);
const findByEmailPaciente = (email) => Paciente.findOne({email: email})
const deletePaciente = (email) => Paciente.deleteOne({email: email})
const putPaciente = (email) => Paciente.updateOne({email: email})


export default {createPaciente, findByEmailPaciente, deletePaciente, putPaciente};