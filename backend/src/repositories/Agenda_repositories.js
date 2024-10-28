import agendaModel from "../models/Agenda.js";


const criarAgenda = async (body) => agendaModel.create(body);

const findAllAgendas = async () => agendaModel.find().lean();

const findBydata = async (data) => 
    agendaModel.find({data_consulta: data})
    .populate('id_clinica', "nome endereco -_id")
    .populate('id_medico', "nome email especialidade -_id")

const findById = async (id) => agendaModel.findById(id);


const findByTurno = async (turno) => 
    agendaModel.find({turno: turno})
    .populate('id_clinica', "nome endereco -_id")
    .populate('id_medico', "nome email especialidade -_id")

const updateAgenda = async (id, update) => agendaModel.updateOne({_id: id}, update, {new: true});

const deleteAgenda = async (id) => agendaModel.deleteOne({_id: id});

export default { criarAgenda, findAllAgendas, findById, findBydata, findByTurno, updateAgenda, deleteAgenda };