import clinica from "../models/Clinica.js";
import medicos_repositories from "./medico_repositories.js";


const createClinica = (body) => clinica.create(body);

const findAllClinicas = () => clinica.find().lean()
    .populate('medicos', "nome email especialidade");

const findByNomeMedico = async (nome) => {
    const medicos = await medicos_repositories.findByNomeMedico(nome);
    const medicosId = medicos.map(medico => medico._id);

    return clinica.find({medicos: { $in: medicosId }})
    .populate('medicos', "nome email especialidade");
};

const findByEspecialidade = (especialidade) => clinica.find({especialidades: especialidade})
    .populate('medicos', "nome email especialidade");

const findByNome = (nome) => clinica.findOne({nome: nome})
    .populate('medicos', "nome email especialidade");

const findById = (id) => clinica.findById(id);

const findByNomeClinica = (nome) => clinica.find({nome: new RegExp(nome, 'i')});

const deleteClinica = (id) => clinica.deleteOne({_id: id});

const patchDataClinica = (id, update) => clinica.updateOne({_id: id}, update, {new: true});

export default { createClinica, findAllClinicas, findByNomeMedico, findByEspecialidade, findByNome, findByNomeClinica, findById, deleteClinica, patchDataClinica };