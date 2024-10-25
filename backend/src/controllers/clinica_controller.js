import clinica_services from "../services/clinica_services.js";


const createClinica = async (req, res) => {
    try {
        const clinica = await clinica_services.createClinica(req.body);
        res.status(201).send({ message: "Clínica criada com sucesso", clinica });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};


const findAllClinicas = async (req, res) => {
    try {
        const clinicas = await clinica_services.findAllClinicas();
        res.status(200).send(clinicas);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};


const findByNomeMedico = async (req, res) => {
    try {
        const clinica = await clinica_services.findByNomeMedico(req.params.nome);
        res.status(200).send(clinica);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};


const findByEspecialidade = async (req, res) => {
    try {
        const clinica = await clinica_services.findByEspecialidade(req.params.especialidade);
        res.status(200).send(clinica);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};


const findByNomeClinica = async (req, res) => {
    try {
        const clinica = await clinica_services.findByNomeClinica(req.params.nome);
        res.status(200).send(clinica);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};


const deleteClinica = async (req, res) => {
    try {
        const clinica = await clinica_services.deleteClinica(req.params.id);
        res.status(200).send({message: "Clinica Deletada com sucesso", clinica});
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};


const patchDataClinica = async (req, res) => {
    try {
        const clinica = await clinica_services.patchDataClinica(req.params.id, req.body);
        res.status(200).send({message: "Clinica Atualizada com sucesso", clinica});
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};


export default { createClinica, findAllClinicas, findByNomeMedico, findByEspecialidade, findByNomeClinica, deleteClinica, patchDataClinica };