import Consulta from '../models/Consulta.js';
import Agenda from "../models/Agenda.js";

const criarConsulta = async (body) => {
    return Consulta.create(body);
}

const findAllConsultas = async () => {
    return await Consulta.find()
        .populate('id_agenda', 'data_consulta -_id')
        .populate('id_paciente', 'nome email cpf -_id')
        .lean();
}

const findById = async (id) => {
    return Consulta.findById(id);
}

const findByData = async (data) => {
    return Consulta.find({ id_agenda: { $ne: null } }) // "not equal" (não igual).
      .populate({
        path: 'id_agenda', // Especifica o campo de referência a ser populado.
        match: { data_consulta: data }, // Aplica um filtro aos documentos referenciados.
        select: 'data_consulta -_id' // Especifica quais campos incluir ou excluir nos documentos populados.
      })
      .populate('id_paciente', 'nome email cpf -_id')
  };

const finByIdAgenda = async (id_agenda) => {
    // Buscar a agenda na tabela Agenda
    const agenda = await Agenda.findById(id_agenda).select('quantas_consultas_dia');
    if (!agenda) {
        return null;
    }

    // Contar a quantidade de consultas agendadas para aquela agenda
    const consultasAgendadas = await Consulta.countDocuments({ id_agenda: id_agenda });
    return { agenda, consultasAgendadas };
}

const updateConsulta = async (id, body) => {
    return Consulta.updateOne({_id: id}, body, {new: true});
}

const deleteConsulta = async (id) => {
    return Consulta.findByIdAndDelete({_id: id});
}


export default { criarConsulta, findAllConsultas, findById, findByData, finByIdAgenda, updateConsulta, deleteConsulta };