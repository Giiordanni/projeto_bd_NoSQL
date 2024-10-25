import medicoServices from "../services/medico_services.js";

const create = async (req, res) => {
    const body = req.body;
    try{
        const user = await medicoServices.createMedico(body);
        return res.status(201).send({message: "Usuário criado com sucesso", user});
    }catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
};

const findAllMedicos = async (req, res) => {
    try {
        const medicos = await medicoServices.getAllMedicos();
        res.status(200).send({message: "Medicos Encontrados", medicos});
    } catch (error) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
};

const findOneByEmail = async (req, res) => {
    const { email } = req.query;

    if(!email){
        return res.status(400).send({ message: "Email não informado" });
    }

    try {
        const user = await medicoServices.findEmailOne(email);

        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
        return res.status(200).send({message: "Usuário encontrado com sucesso", user});
    } catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
};

const findNome = async (req, res) => {
    const {nome} = req.query;

    if(!nome){
        res.status(400).send({ message: "Nome não informado" });
    }

    try{
        const medico = await medicoServices.findName(nome);

        if(!medico){
            return res.status(404).send({ message: "Médico não encontrado"});
        }
        return res.status(200).send({message: "Usuário encontrado com sucesso", medico});
    }catch(err){
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
};

const findByEspecialidade = async (req, res) => {
    const { especialidade } = req.query;

    if(!especialidade){
        return res.status(400).send({ message: "Especialidade não informada" });   
    }

    try {
        const medico = await medicoServices.findEspecialidade(especialidade);

        if (!medico) { 
            return res.status(404).send({ message: "Médico não encontrado" });
        }
        return res.status(200).send({message: "Usuário encontrado com sucesso", medico});
    } catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
};

const findById = async (req, res) => {
    const  id  = req.params;

    if(!id){
        return res.status(400).send({ message: "Id não informado" });
    }

    try{
        const medico = await medicoServices.findById(id);

        if(!medico){
            return res.status(404).send({ message: "Médico não encontrado"});
        }
        return res.status(200).send({message: "Usuário encontrado com sucesso", medico});
    }catch(err){   
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
};

const login = async (req, res) => {
    const {email, senha} = req.body;

    if (!email || !senha) {
        return res.status(400).send({ message: "Email ou senha não informados!" });
    }

    try {
        const token = await medicoServices.loginMedico(email, senha);
        return res.status(200).send({message: "Login feito com sucesso", token });
    } catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
};

const deletarMedico = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        return res.status(400).send({ message: "Email não informado" });
    }
    
    try {
        const deletar = await medicoServices.deletarMedico(email);
        res.status(200).send({message: "Médico deletado com sucesso!"});
    } catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
};

const updateMedico = async (req, res) => {
    try {
        const {email} = req.body; // desestruturando o email do corpo da requisição
        const update = req.body;
        const result = await medicoServices.atualizarMedico(email, update);

        if(result.matchedCount === 0){
            return res.status(404).send({ message: 'Médico não encontrado' });
        }
        if(result.modifiedCount === 0){
            return res.status(404).send({ message: 'Nenhuma modificação realizada' });
        }
        res.status(200).send({ message: 'Médico atualizado com sucesso' }, result);
    }catch (err) {
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).send({ message: err.message });
    }
};

export default { create, findAllMedicos, findOneByEmail, findNome, login, deletarMedico, updateMedico, findByEspecialidade, findById };