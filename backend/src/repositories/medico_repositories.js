import Medico from "../models/Medico.js";


const createMedico = (body) => Medico.create(body);
const findAllMedicos = () => Medico.find().lean();
const findByEmailMedico = (email) =>
    Medico.findOne({ email: email });
const findByNomeMedico = (nome) => 
    Medico.find({ nome: new RegExp(nome, "i")}).select('nome email especialidade clinica'); //use espacos no lugar de virgulas
const findByCpf = (cpf) => Medico.findOne({ cpf: cpf });
const findById = (id) => Medico.findById(id);
const findByEspecialidadeMedico = (especialidade) =>
    Medico.find({ especialidade: new RegExp(especialidade, "i") }).select('nome email especialidade clinica');
const deletarMedico = (id) =>
    Medico.deleteOne({ _id: id });
const atualizarDadosMedico = (medicoId, update) =>
    Medico.updateOne({_id: medicoId}, update, { new: true });


export default { createMedico, findAllMedicos, findByEmailMedico, findById,findByNomeMedico, findByEspecialidadeMedico, deletarMedico, atualizarDadosMedico, findByCpf };
