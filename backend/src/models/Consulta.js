import mongoose from 'mongoose';

const consulta_schema = new mongoose.Schema({
    id_medico:{
        type: Number,
        required: true
    },
    id_paciente:{
        type: Number,
        required: true,
    },
    tipo_consulta:{
        type: String,
        required: true
    },
    data_consulta:{
        type: Date,
        required: true
    },
    sala_consulta:{
        type: Number,
        required: true
    },
    hora_consulta:{
        type: Date,
        required: true
    }
});


const consulta = mongoose.model("consulta", consulta_schema);

export default consulta;