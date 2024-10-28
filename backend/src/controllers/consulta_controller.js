import consultaServices from "../services/consulta_services.js";

const createConsulta = async (req, res) => {
    try {
        const {id_agenda} = req.body;
        const idPaciente = req.userId; 
        const consulta = req.body;

        const result = await consultaServices.createConsulta(id_agenda, {id_paciente: idPaciente, ...consulta});

        res.status(200).send({message: "Consulta Criada com sucesso", result});
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
};

const findAllConsultas = async (req, res) => {
    try{
        const consultas = await consultaServices.findAllConsultas();

        res.status(200).send({message: "Consultas encontradas com sucesso", consultas});
    }catch(error){
        res.status(error.status || 500).send(error.message);
    }
};

const findByData = async (req, res) => {
    try{
        const data = req.query.data;
        const consultas = await consultaServices.findByData(data);

        res.status(200).send({message: "Consultas encontradas com sucesso", consultas});
    }catch(error){
        res.status(error.status || 500).send(error.message);
    }
};

const updateConsulta = async (req, res) => {
    try{
        const id = req.params.id;
        const body = req.body;

        const consulta = await consultaServices.updateConsulta(id, body);

        res.status(200).send({message: "Consulta atualizada com sucesso"});
    }catch(error){
        res.status(error.status || 500).send(error.message);
    }
};

const deleteConsulta = async (req, res) => {
    try{
        const id = req.params.id;

        const consulta = await consultaServices.deleteConsulta(id);

        res.status(200).send({message: "Consulta deletada com sucesso"});
    }catch(error){
        res.status(error.status || 500).send(error.message);
    }
};


export default { createConsulta, findAllConsultas, findByData, updateConsulta, deleteConsulta };