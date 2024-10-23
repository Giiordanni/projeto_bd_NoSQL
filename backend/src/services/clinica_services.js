import clinicaRepo from "../repositories/clinica_repositories.js";


const createClinica = async (body) => {
    const { nome, endereco, telefone, especialidades, medicos } = body;

    if (!nome || !endereco || !telefone || !especialidades || !medicos ) {
        throw new Error("Campos obrigatórios não preenchidos");
    }
    const clinica = await clinicaRepo.createClinica({ nome, endereco, telefone, especialidades, medicos });
    return clinica;
};

const findAllClinicas = async () => {
    const clinicas = await clinicaRepo.findAllClinicas();
    if (clinicas.length === 0) throw new Error("Não há clínicas cadastradas!");
    return clinicas;
};

const findByNomeMedico = async (nome) => {
    if (!nome) {
        throw new Error("Nome não fornecido");
    }
    const clinica = await clinicaRepo.findByNomeMedico(nome);
    if (!clinica.length) {
        throw new Error("Nenhuma clínica encontrada");
    }
    return clinica;
};

const findByEspecialidade = async (especialidade) => {
    if (!especialidade) {
        throw new Error("Especialidade não fornecida");
    }
    const clinica = await clinicaRepo.findByEspecialidade(especialidade);
    if (!clinica.length) {
        throw new Error("Nenhuma clínica encontrada");
    }
    return clinica;
};

const findByNome = async (nome) => {
    if (!nome) {
        throw new Error("Nome não fornecido");
    }
    const clinica = await clinicaRepo.findByNome(nome);
    if (!clinica) {
        throw new Error("Nenhuma clínica encontrada");
    }
    return clinica;
};

const deleteClinica = async (id) => {
    if (!id) {
        throw new Error("Id não fornecido");
    }
    const clinica = await clinicaRepo.deleteClinica(id);
    if (!clinica) {
        throw new Error("Nenhuma clínica encontrada");
    }
    return clinica;
};

const patchDataClinica = async (id, update) => {
    if (!id) {
        throw new Error("Id não fornecido");
    }
    const clinica = await clinicaRepo.patchDataClinica(id, update);
    if (!clinica) {
        throw new Error("Nenhuma clínica encontrada");
    }
    return clinica;
};

export default { createClinica, findAllClinicas, findByNomeMedico, findByEspecialidade, findByNome, deleteClinica, patchDataClinica };