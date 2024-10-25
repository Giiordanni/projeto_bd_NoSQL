import mongoose from "mongoose";


const clinica_schema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    endereco:{
        type: String,
        required: true
    },
    horario_funcionamento:{
        type: String,
        required: false
    },
    telefone:{
        type: Number,
        required: true
    },
    especialidades:{
        type: [String],
        required: true
    },
    medicos:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "medico",
        required: false
    },
});

const clinica = mongoose.model("clinica", clinica_schema);

export default clinica;