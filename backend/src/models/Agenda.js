import mongoose from 'mongoose';

const agendaSchema = new mongoose.Schema({
    data_consulta: {
        type: String,
        required: true
    },
    sala_consulta: {
        type: Number,
        required: false
    },
    turno: {
        type: String,
        required: true
    },
    valor_consulta: {
        type: Number,
        required: false
    },
    quantas_consultas_dia: {
        type: Number,
        required: true
    },    id_clinica: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'clinica',
        required: true
    },
    id_medico: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'medico',
        required: true
    }
});

const Agenda = mongoose.model('Agenda', agendaSchema);

export default Agenda;