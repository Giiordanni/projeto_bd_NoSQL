import mongoose from "mongoose";
import bcrypt from "bcrypt";


const paciente_schema = new mongoose.Schema({
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
    historico:{
        type: [Object],
        required: false
    }
});

paciente_schema.pre("save", async function(next){
    if(this.isModified("senha")){
        this.senha = await bcrypt.hash(this.senha, 10);
    }
    next();
});

const paciente = mongoose.model("paciente", paciente_schema);

export default paciente;