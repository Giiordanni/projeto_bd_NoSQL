import Agenda_repositories from "../repositories/Agenda_repositories.js";
import logger from "../logger/logger.mjs";
import CustomError from "../error/error.js";
import clinica_repositories from "../repositories/clinica_repositories.js";

const criarAgenda = async (body) => {
    logger.info("Criando Agenda");

    const {nome_clinica, id_medico, data_consulta, turno, valor_consulta, quantas_consultas_dia} = body;

    if(!nome_clinica || !id_medico || !data_consulta || !turno || !valor_consulta || !quantas_consultas_dia){
        logger.error("Preencha todos os campos obrigatórios");
        throw new CustomError("Preencha todos os campos obrigatórios", 401);
    }

    const [dia, mes, ano] = body.data_consulta.split("/");
    body.data_consulta = `${ano}-${mes}-${dia}`


    logger.info("Buscando o ID da clinica pelo nome");
    const clinica = await clinica_repositories.findByNome(nome_clinica).select('id_clinica');
    if(!clinica){
        logger.error("Clinica não encontrada");
        throw new CustomError("Clinica não encontrada", 404);
    }

    const agenda = await Agenda_repositories.criarAgenda({...body, id_clinica: clinica});

    if(!agenda){
        logger.error("Erro ao criar agenda");
        throw new CustomError("Erro ao criar agenda", 500);
    }

    logger.info("Agenda criada com sucesso");
    return {
        status: 201,
        agenda:  {
            id_clinica: agenda.id_clinica,
            id_medico: agenda.id_medico,
            data_consulta: agenda.data_consulta,
            turno: agenda.turno,
            valor_consulta: agenda.valor_consulta,
            quantas_consultas_dia: agenda.quantas_consultas_dia
        }
    };
};


const findAllAgendas = async () => {
    logger.info("buscando todas as agendas disponíveis");
    
    const hoje = new Date().toISOString().split("T")[0]; // Obter a data atual no formato YYYY-MM-DD
    const agendas = await Agenda_repositories.findAllAgendas({
        data_consulta: { $gte: hoje } // &gte(maior ou igual) para buscar apenas as agendas futuras ou as de hoje
    });

    if(!agendas || agendas.length === 0){
        logger.error("Não há agendas disponíveis");
        throw new CustomError("Não há agendas disponíveis", 404);
    }
    logger.info("Agendas encontradas com sucesso");
    return agendas;

    
};


const findByData = async (data) => {
    logger.info("Buscando agenda pela data");

    const agendaData = await Agenda_repositories.findBydata(data);

    if(!agendaData || agendaData.length === 0){
        logger.error("Agenda não encontrada");
        throw new CustomError("Agenda não encontrada", 404);
    }
    logger.info("Agenda encontrada com sucesso");
    return agendaData;
    
};


const findByTurno = async (turno) => {
    logger.info("Buscando agenda por turno");

   
    const hoje = new Date().toISOString().split("T")[0];
    const agendaTurno = await Agenda_repositories.findByTurno(turno, {
        data_consulta: { $gte: hoje}
    });

    if(!agendaTurno || agendaTurno.length === 0){
        logger.error("Agenda não encontrada");
        throw new CustomError("Agenda não encontrada", 404);
    }

    logger.info("Agenda encontrada com sucesso");
    return agendaTurno;
};


const updateAgenda = async (id, update) => {
    logger.info("Atualizando agenda");

    const findAgenda = await Agenda_repositories.findById(id);

    if(!findAgenda){
        logger.error("Agenda não encontrada");
        throw new CustomError("Agenda não encontrada", 404);
    }

    const agenda = await Agenda_repositories.updateAgenda(id, update);

    if(!agenda){
        logger.error("Erro ao atualizar agenda");
        throw new CustomError("Erro ao atualizar agenda", 404);
    }

    logger.info("Agenda atualizada com sucesso");
    return agenda;
};


const deleteAgenda = async (id) => {
    logger.info("Deletando agenda");

    const findAgenda = await Agenda_repositories.findById(id);

    if(!findAgenda){
        logger.error("Agenda não encontrada");
        throw new CustomError("Agenda não encontrada", 404);
    }

    const agenda = await Agenda_repositories.deleteAgenda(id);

    if(!agenda){
        logger.error("Erro ao deletar agenda");
        throw new CustomError("Erro ao deletar agenda", 404);
    }

    logger.info("Agenda deletada com sucesso");
    return agenda;
    
};

export default { criarAgenda, findAllAgendas, findByData, findByTurno, updateAgenda, deleteAgenda };
