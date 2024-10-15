import Secretario from "../models/Secretario.js";

const createSec = (body) => Secretario.create(body);
const findAllSec = () => Secretario.find().lean();
const findByEmailSec = (email) => Secretario.findOne({email: email});
const findById = (id) => Secretario.findById(id);
const deleteSec = (id) => Secretario.deleteOne({_id: id});
const patchDataSec = (email, update) => Secretario.updateOne({email: email}, update, {new: true});

export default { createSec, findAllSec,  findByEmailSec, deleteSec, patchDataSec, findById };


