import Medico from "../models/Medico.js";

const createMedico = (body) => Medico.create(body);
const findAllMedicos = () => Medico.find();
const findByEmailMedico = (email) =>
    Medico.findOne({ email: email });

export default { createMedico, findAllMedicos, findByEmailMedico };