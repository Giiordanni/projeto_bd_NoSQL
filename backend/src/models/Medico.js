import mongoose from "mongoose";
import bcrypt from "bcrypt";


const medico_schema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true,
        select: false
    },
    especialidade:{
        type: String,
        required: true
    },
    cpf:{
        type: String,
        required: true,
        unique: true
    },
    data_nascimento:{
        type: String,
        required: false
    },
    sexo:{
        type: String,
        required: false
    },
    endereco:{
        type: String,
        required: false
    },
    telefone:{
        type: Number,
        required: false
    },
    clinica: {
        type: String,
        required: false
    }
});

medico_schema.pre("save", async function (next){
    if(this.isModified("senha")){
        this.senha = await bcrypt.hash(this.senha, 10);
    }
    next();
    
});

const medico = mongoose.model("medico", medico_schema);

export default medico;