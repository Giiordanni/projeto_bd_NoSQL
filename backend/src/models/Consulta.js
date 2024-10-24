import mongoose from 'mongoose';

const consulta_schema = new mongoose.Schema({
    id_agenda:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agenda',
        required: true
    },
    id_paciente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true,
    },
    tipo_consulta:{
        type: String,
        required: true
    },
    status_consulta:{
        type: String,
        required: false,
        default: "agendada"
    },
});


const consulta = mongoose.model("consulta", consulta_schema);

export default consulta;