import clinicaRepo from "../repositories/clinica_repositories.js";
import logger from "../logger/logger.mjs";
import customError from "../error/error.js";
import medico_repositories from "../repositories/medico_repositories.js";


const createClinica = async (body) => {
    logger.info("Criando clínica");

    const { nome, endereco, telefone, especialidades, medicos } = body;

    if (!nome || !endereco || !telefone || !especialidades || !medicos ) {
        logger.error("Campos obrigatórios não preenchidos");
        throw new customError("Campos obrigatórios não preenchidos", 401);
    }

    if(medicos && medicos.length > 0) {
        for (const medicoId of medicos) {
            const medico = await medico_repositories.findById(medicoId);
            if(!medico) {
                logger.error("Médico não encontrado");
                throw new customError("Médico não encontrado", 404);
            }
        }
    }

    const clinica = await clinicaRepo.createClinica(body);

    if (!clinica) {
        logger.error("Erro ao criar clínica");
        throw new customError("Erro ao criar clínica", 400);
    }

    logger.info("Clínica criada com sucesso");
    return clinica;
};


const findAllClinicas = async () => {
    logger.info("Buscando todas as clínicas");

    const clinicas = await clinicaRepo.findAllClinicas();
    if (clinicas.length === 0) {
        logger.error("Não há clínicas cadastradas!");
        throw new customError("Não há clínicas cadastradas!", 404);
    }
    logger.info("Clínicas encontradas com sucesso");
    return clinicas;
};


const findByNomeMedico = async (nome) => {
    logger.info("Buscando clínica por nome do médico");

    if(!nome) {
        logger.error("Nome do médico não fornecido");
        throw new customError("Nome do médico não fornecido", 401);
    }

    const clinica = await clinicaRepo.findByNomeMedico(nome);

    if (clinica.length === 0) {
        logger.error("Nenhuma clínica encontrada");
        throw new customError("Nenhuma clínica encontrada", 404);
    }

    logger.info("Clínica encontrada com sucesso");
    return clinica;
};


const findByEspecialidade = async (especialidade) => {
    logger.info("Buscando clínica por especialidade");

    if (!especialidade) {
        logger.error("Especialidade não fornecida");
        throw new customError("Especialidade não fornecida", 401);
    }

    const clinica = await clinicaRepo.findByEspecialidade(especialidade);
    if (clinica.length === 0) {
        logger.error("Nenhuma clínica encontrada");
        throw new customError("Nenhuma clínica encontrada", 404);
    }

    logger.info("Clínica encontrada com sucesso");
    return clinica;
};


const findByNomeClinica = async (nome) => {
    logger.info("Buscando clínica por nome");

    if (!nome) {
        logger.error("Nome não fornecido");
        throw new customError("Nome não fornecido", 401);
    }

    const clinica = await clinicaRepo.findByNomeClinica(nome);
    if (clinica.length === 0) {
        logger.error("Nenhuma clínica encontrada");
        throw new customError("Nenhuma clínica encontrada", 404);
    }

    logger.info("Clínica encontrada com sucesso");
    return clinica;
};


const deleteClinica = async (id) => {
    logger.info("Deletando clínica");

    if (!id) {
        logger.error("Id não fornecido");
        throw new customError("Id não fornecido", 401);
    }

    const findClinica = await clinicaRepo.findById(id);
    if(!findClinica) {
        logger.error("Clínica não encontrada");
        throw new customError("Clínica não encontrada", 404);
    }

    const clinica = await clinicaRepo.deleteClinica(id);
    if (!clinica) {
        logger.error("Erro ao deletar clínica");
        throw new customError("Erro ao deletar clínica", 400);
    }

    logger.info("Clínica deletada com sucesso");
    return clinica;
};


const patchDataClinica = async (id, update) => {
    logger.info("Atualizando dados da clínica");

    if (!id) {
        logger.error("Id não fornecido");
        throw new customError("Id não fornecido", 401);
    }
    const { medicos } = update;
    
    if (medicos && medicos.length > 0) {
        for (const medicoId of medicos) {
            const medico = await medico_repositories.findById(medicoId);
            if(!medico) {
                logger.error("Médico não encontrado");
                throw new customError("Médico não encontrado", 404);
            }
        }
    }
    const findClinica = await clinicaRepo.findById(id);
    if(!findClinica || findClinica.length === 0) {
        logger.error("Clínica não encontrada");
        throw new customError("Clínica não encontrada", 404);
    }

    const clinica = await clinicaRepo.patchDataClinica(id, update);
    if (!clinica) {
        logger.error("Erro ao atualizar dados da clínica");
        throw new customError("Erro ao atualizar dados da clínica");
    }

    if(clinica.modifiedCount === 0) {
        logger.error("Nenhum dado da clínica foi atualizado");
        throw new customError("Nenhum dado da clínica foi atualizado", 400);    
    }

    logger.info("Dados da clínica atualizados com sucesso");
    return clinica;
};

export default { createClinica, findAllClinicas, findByNomeMedico, findByEspecialidade, findByNomeClinica, deleteClinica, patchDataClinica };