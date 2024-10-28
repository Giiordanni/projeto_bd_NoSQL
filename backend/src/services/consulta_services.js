import logger from "../logger/logger.mjs";
import consultaRepository from "../repositories/consulta_repositories.js";
import CustomError from "../error/error.js";

const createConsulta = async (idAgenda, paciente) => {
  logger.info("Criando consulta");

  const { id_paciente, tipo_consulta } = paciente;
  if (!id_paciente || !tipo_consulta || !idAgenda) {
    logger.error("Campos obrigatórios não preenchidos");
    throw new CustomError("Campos obrigatórios não preenchidos", 400);
  }

  const result = await consultaRepository.finByIdAgenda(idAgenda);
  if (!result) {
    logger.error("Agenda não encontrada");
    throw new CustomError("Agenda não encontrada", 400);
  }

  const { agenda, consultasAgendadas } = result;
  if (consultasAgendadas >= agenda.quantas_consultas_dia) {
    logger.error("Agenda lotada");
    throw new CustomError("Agenda lotada", 400);
  }

  const criarConsulta = await consultaRepository.criarConsulta({
    id_agenda: idAgenda,
    ...paciente,
  });
  if (!criarConsulta) {
    logger.error("Erro ao criar consulta");
    throw new CustomError("Erro ao criar consulta", 400);
  }

  logger.info("Consulta criada com sucesso");
  return {
    id_agenda: criarConsulta.id_agenda,
    id_paciente: criarConsulta.id_paciente,
    tipo_consulta: criarConsulta.tipo_consulta,
    status_consulta: criarConsulta.status_consulta,
  };
};


const findAllConsultas = async () => {
  logger.info("Buscando todas as consultas");

  // Obter a data atual no formato YYYY-MM-DD
  const hoje = new Date().toISOString().split("T")[0]; 
  

  const consultas = await consultaRepository.findAllConsultas();
  if (!consultas || consultas.length === 0) {
    logger.error("Consultas Não encontradas");
    throw new CustomError("Consultas Não encontradas", 400);
  }


  const consultasFiltradas = consultas.filter(consulta => consulta.id_agenda.data_consulta >= hoje);
  if (consultasFiltradas.length === 0) {
    logger.error("Consultas Não encontradas");
    throw new CustomError("Consultas Não encontradas", 400);
}


  logger.info("Consultas encontradas");
  return consultasFiltradas;
};


const findByData = async (data) => {
  logger.info("Buscando consultas pela data");

  const consultas = await consultaRepository.findByData(data);
  if (!consultas || consultas.length === 0) {
    logger.error("Consultas Não encontradas");
    throw new CustomError("Consultas Não encontradas", 400);
  }

  const consultasFiltradas = consultas.filter(consulta => consulta.id_agenda !== null);
  if (!consultasFiltradas || consultasFiltradas.length === 0) {
    logger.error("Consultas não encontradas");
    throw new CustomError("Consultas não encontradas", 400);
  }

  logger.info("Consultas encontradas");
  return consultasFiltradas;

};


const updateConsulta = async (id, body) => {
  logger.info("Atualizando consulta");

  const consulta = await consultaRepository.findById(id);
  if (!consulta) {
    logger.error("Consulta não encontrada");
    throw new CustomError("Consulta não encontrada", 400);
  }

  const consultaAtualizada = await consultaRepository.updateConsulta(id, body);
  if (!consultaAtualizada) {
    logger.error("Erro ao atualizar consulta");
    throw new CustomError("Erro ao atualizar consulta", 400);
  }

  console.log(consultaAtualizada);
  if(consultaAtualizada.modifiedCount === 0) {
    logger.error("Nenhum dado foi atualizado");
    throw new CustomError("Nenhum dado foi atualizado", 400);
  } 

  logger.info("Consulta atualizada com sucesso");
  return consultaAtualizada;
};


const deleteConsulta = async (id) => {
  logger.info("Deletando consulta");

  const consulta = await consultaRepository.findById(id);
  if (!consulta) {
    logger.error("Consulta não encontrada");
    throw new CustomError("Consulta não encontrada", 400);
  }

  const consultaDeletada = await consultaRepository.deleteConsulta(id);
  if (!consultaDeletada) {
    logger.error("Erro ao deletar consulta");
    throw new CustomError("Erro ao deletar consulta", 400);
  }

  logger.info("Consulta deletada com sucesso");
  return consultaDeletada;
};


export default { createConsulta, findAllConsultas, findByData, updateConsulta, deleteConsulta };
