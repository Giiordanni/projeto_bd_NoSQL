import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const secretario_schema = new mongoose.Schema({
    nome:{
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
        required: false
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