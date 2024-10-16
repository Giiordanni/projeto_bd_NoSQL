import Medico from "../models/Medico.js";

const createMedico = (body) => Medico.create(body);

const findAllMedicos = () => Medico.find().lean();

const findByEmailMedico = (email) =>
    Medico.findOne({ email: email });

const findByNomeMedico = (nome) => 
    Medico.find({ nome: new RegExp(nome, "i")}).select('nome email especialidade clinica'); //use espacos no lugar de virgulas

const findById = (id) => Medico.findById(id);

const findByEspecialidadeMedico = (especialidade) =>
    Medico.find({ especialidade: especialidade }).select('nome email especialidade clinica');

const deletarMedico = (email) =>
    Medico.deleteOne({ email: email });

const atualizarDadosMedico = (email, update) =>
    Medico.updateOne({ email: email }, update, { new: true });


export default { createMedico, findAllMedicos, findByEmailMedico, findById,findByNomeMedico, findByEspecialidadeMedico, deletarMedico, atualizarDadosMedico };
