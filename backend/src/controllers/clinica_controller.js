import clinica_services from "../services/clinica_services.js";

const createClinica = async (req, res) => {
    try {
        const clinica = await clinica_services.createClinica(req.body);
        res.status(201).json(clinica);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findAllClinicas = async (req, res) => {
    try {
        const clinicas = await clinica_services.findAllClinicas();
        res.status(200).json(clinicas);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findByNomeMedico = async (req, res) => {
    try {
        const clinica = await clinica_services.findByNomeMedico(req.params.nome);
        res.status(200).json(clinica);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findByEspecialidade = async (req, res) => {
    try {
        const clinica = await clinica_services.findByEspecialidade(req.params.especialidade);
        res.status(200).json(clinica);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findByNome = async (req, res) => {
    try {
        const clinica = await clinica_services.findByNome(req.params.nome);
        res.status(200).json(clinica);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteClinica = async (req, res) => {
    try {
        const clinica = await clinica_services.deleteClinica(req.params.id);
        res.status(200).json(clinica);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const patchDataClinica = async (req, res) => {
    try {
        const clinica = await clinica_services.patchDataClinica(req.params.id, req.body);
        res.status(200).json(clinica);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default { createClinica, findAllClinicas, findByNomeMedico, findByEspecialidade, findByNome, deleteClinica, patchDataClinica };