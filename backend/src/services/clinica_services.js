import clinicaRepo from "../repositories/clinica_repositories.js";
import logger from "../logger/logger.js";


const createClinica = async (body) => {
    logger.info("Criando clínica");
    const { nome, endereco, telefone, especialidades, medicos } = body;

    if (!nome || !endereco || !telefone || !especialidades || !medicos ) {
        logger.error("Campos obrigatórios não preenchidos");
        throw new Error("Campos obrigatórios não preenchidos");
    }

    const clinica = await clinicaRepo.createClinica({ nome, endereco, telefone, especialidades, medicos });

    if (!clinica) {
        logger.error("Erro ao criar clínica");
        throw new Error("Erro ao criar clínica");
    }

    logger.info("Clínica criada com sucesso");
    return clinica;
};

const findAllClinicas = async () => {
    logger.info("Buscando todas as clínicas");
    const clinicas = await clinicaRepo.findAllClinicas();
    if (clinicas.length === 0) {
        logger.error("Não há clínicas cadastradas!");
        throw new Error("Não há clínicas cadastradas!");
    }

    logger.info("Clínicas encontradas com sucesso");
    return clinicas;
};

const findByNomeMedico = async (nome) => {
    logger.info("Buscando clínica por nome do médico");

    if(!nome) {
        logger.error("Nome do médico não fornecido");
        throw new Error("Nome do médico não fornecido");
    }

    const clinica = await clinicaRepo.findByNomeMedico(nome);

    if (!clinica.length) {
        logger.error("Nenhuma clínica encontrada");
        throw new Error("Nenhuma clínica encontrada");
    }

    logger.info("Clínica encontrada com sucesso");
    return clinica;
};

const findByEspecialidade = async (especialidade) => {
    logger.info("Buscando clínica por especialidade");

    if (!especialidade) {
        logger.error("Especialidade não fornecida");
        throw new Error("Especialidade não fornecida");
    }

    const clinica = await clinicaRepo.findByEspecialidade(especialidade);
    if (!clinica.length) {
        logger.error("Nenhuma clínica encontrada");
        throw new Error("Nenhuma clínica encontrada");
    }

    logger.info("Clínica encontrada com sucesso");
    return clinica;
};

const findByNome = async (nome) => {
    logger.info("Buscando clínica por nome");

    if (!nome) {
        logger.error("Nome não fornecido");
        throw new Error("Nome não fornecido");
    }

    const clinica = await clinicaRepo.findByNome(nome);
    if (!clinica) {
        logger.error("Nenhuma clínica encontrada");
        throw new Error("Nenhuma clínica encontrada");
    }

    logger.info("Clínica encontrada com sucesso");
    return clinica;
};

const deleteClinica = async (id) => {
    logger.info("Deletando clínica");

    if (!id) {
        logger.error("Id não fornecido");
        throw new Error("Id não fornecido");
    }

    const clinica = await clinicaRepo.deleteClinica(id);
    if (!clinica) {
        logger.error("Nenhuma clínica encontrada");
        throw new Error("Nenhuma clínica encontrada");
    }

    logger.info("Clínica deletada com sucesso");
    return clinica;
};

const patchDataClinica = async (id, update) => {
    logger.info("Atualizando dados da clínica");
    if (!id) {
        logger.error("Id não fornecido");
        throw new Error("Id não fornecido");
    }

    const clinica = await clinicaRepo.patchDataClinica(id, update);
    if (!clinica) {
        logger.error("Nenhuma clínica encontrada");
        throw new Error("Nenhuma clínica encontrada");
    }

    logger.info("Dados da clínica atualizados com sucesso");
    return clinica;
};

export default { createClinica, findAllClinicas, findByNomeMedico, findByEspecialidade, findByNome, deleteClinica, patchDataClinica };