import agenda_services from "../services/agenda_services.js";

const criarAgenda = async (req, res) => {
    try {
        const medicoId = req.userId; // ID do médico extraído do token
        const response = await agenda_services.criarAgenda({ ...req.body, id_medico: medicoId });

        return res.status(201).send({message: "Agenda criada com sucesso", response});
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ message: error.message });
    }
};

const findAllAgendas = async (req, res) => {
    try {
        const response = await agenda_services.findAllAgendas();
        return res.status(200).send({message: "Agenda encontrada", response});
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ message: error.message });
    }
};

const findByData = async (req, res) => {
    try{
        const {data} = req.params;
        const response = await agenda_services.findByData(data);
        return res.status(200).send({message: "Agenda encontrada", response});
    }catch(error){
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ message: error.message });
    }
};


const findByTurno = async (req, res) => {
    try{
        const response = await agenda_services.findByTurno(req.params.turno);
        return res.status(200).send({message: "Agenda encontrada", response});
    }catch(error){
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ message: error.message });
    }
};


const updateAgenda = async (req, res) => {
    try{
        const response = await agenda_services.updateAgenda(req.params.id, req.body);
        return res.status(200).send({message: "Agenda atualizada com sucesso"});
    }catch(error){
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ message: error.message });
    }
};


const deleteAgenda = async (req, res) => {
    try{
        const response = await agenda_services.deleteAgenda(req.params.id);
        return res.status(200).send({message: "Agenda deletada com sucesso"});
    }catch(error){
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ message: error.message });
    }
};


export default { criarAgenda, findAllAgendas, findByData, findByTurno, updateAgenda, deleteAgenda };