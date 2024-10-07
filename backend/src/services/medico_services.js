import medico_repositories from "../repositories/medico_repositories.js";
import jwt from "jsonwebtoken";
import middleware from "../middlewares/global.middlewares.js";


const createMedico = async (body) => {
    const {nome, email, senha, confirm_senha, especialidade, coren, cpf} = body;

    if ( !nome || !email || !senha || !confirm_senha || !especialidade || !coren || !cpf){
        throw new Error("Submeta todos os campos do registro");
    }

    if(!middleware.validarCPF(cpf)) throw new Error("CPF inválido");

    const medico_existente = await medico_repositories.findByEmailMedico(email);
    if (medico_existente) throw new Error("Usuário já cadastrado no banco");

    if (senha !== confirm_senha) throw new Error("As senhas não coincidem");
    if (senha.length < 6) throw new Error("A senha deve ter no mínimo 6 caracteres");
    if (senha.length > 20) throw new Error("A senha deve ter no máximo 20 caracteres");
    
    try {
        await middleware.validarEmail(email);
    } catch (error) {
        throw new Error(`Erro na validação do email: ${error.message}`);
    }

    const user_medico = await medico_repositories.createMedico(body);
    if (!user_medico) throw new Error("Erro ao criar usuário");

    const token = generateToken(user_medico.id);

    return {
        user: {
            id: user_medico.id,
            nome,
            email,
            especialidade,
        },
        token,
    };
};


const deletarMedico = async (body) => {
    const { email } = body;
    const user = await medico_repositories.findByEmailMedico(email);
    if (!user) throw new Error("Usuário não encontrado");
    await medico_repositories.deletarMedico(email);
    return user;
};

const getAllMedicos = async () => {
    const medicos = await medico_repositories.findAllMedicos();
    if (medicos.length === 0) throw new Error("Não há médicos cadastrados!");
    if (!medicos) throw new Error("Usuário não encontrado");
    return medicos;
};

const findEmailOne = async (email) => {
    const user = await medico_repositories.findByEmailMedico(email);
    return user;
};

const loginMedico = async (email, senha) => {
    const medico = await medico_repositories.findByEmailMedico(email);
    if (!medico){
        throw new Error("Email ou senha incorretos");
    }

    const senhaValida = await bcrypt.compare(senha, medico.senha);
    if (!senhaValida) {
        throw new Error("Email ou senha incorretos");
    }

    const token = login.genarateToken(medico.id);
    return { token };
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETJWT, {
        expiresIn: 86400, // 24 horas
    });
};


export default {
    createMedico,
    getAllMedicos,
    findEmailOne,
    loginMedico,
    generateToken,
    deletarMedico
};