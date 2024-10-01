import Secretario from "../models/Secretario.js";

const createRepositories = (body) => Secretario.create(body);
const findAllRepositories = () => Secretario.find();
const findByEmailRepositories = (email) => Secretario.findOne({email: email})

export default { createRepositories, findAllRepositories, findByEmailRepositories };


