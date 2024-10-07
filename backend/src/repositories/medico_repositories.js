import Medico from "../models/Medico.js";

const createMedico = (body) => Medico.create(body);
const findAllMedicos = () => Medico.find().lean();
const findByEmailMedico = (email) =>
    Medico.findOne({ email: email });
const findByNomeMedico = (nome) => 
    Medico.find({ nome: nome });
const findByEspecialidadeMedico = (especialidade) =>
    Medico.find({ especialidade: especialidade });
const deletarMedico = (email) =>
    Medico.deleteOne({ email: email });

export default { createMedico, findAllMedicos, findByEmailMedico, findByNomeMedico, findByEspecialidadeMedico, deletarMedico };
