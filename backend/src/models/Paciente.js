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
    data_nascimento:{
        type: String,
        required: true
    },
    sexo:{
        type: String,
        required: true
    },
    endereco:{
        type: String,
        required: true
    },
    telefone:{
        type: Number,
        required: true
    },
    historico:{
        type: String,
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