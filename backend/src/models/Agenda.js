import mongoose from 'mongoose';

const agendaSchema = new mongoose.Schema({
    id_clinica: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Clinica',
        required: true
    },
    id_medico: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    },
    data_consulta: {
        type: Date,
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
    }
});

const Agenda = mongoose.model('Agenda', agendaSchema);

export default Agenda;