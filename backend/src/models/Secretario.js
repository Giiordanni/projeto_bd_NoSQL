import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const secretario_schema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    sobrenome:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefone:{
        type: Number,
        required: true
    },
    cpf:{
        type: String,
        required: true,
        unique: true
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
    senha:{
        type: String,
        required: true,
        select: false
    }
});

secretario_schema.pre("save", async function(next){
    if(this.isModified("senha")){
        this.senha = await bcrypt.hash(this.senha, 10);
    }
    next();
});

const secretario = mongoose.model("secretario", secretario_schema);

export default secretario;