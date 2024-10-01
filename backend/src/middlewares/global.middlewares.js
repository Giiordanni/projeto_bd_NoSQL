import mongoose from "mongoose";
import SecServices from "../services/secretario.services.js";
import dns from "dns/promises";

export const validId = (req, res, next) => {
  try {
    const id = req.params._id;

    if (mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "ID inválido!" });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const ValidUser = async (req, res, next) => {
  try {
    const id = req.params._id;

    const sec = await SecServices.findyByIdServices(id);

    if (!sec) {
      return res.status(404).send({ message: "Usuário não encontrado!" });
    }

    req.id = id;
    req.sec = sec;
    next();
  } catch (error) {
    res.status(500).send({ message: error.messagae });
  }
};

const validEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const dominio = email.split("@").pop();

    const addresses = await dns.resolveMx(dominio);
    if (!addresses || addresses.length === 0) {
      return res
        .status(400)
        .send({ message: `O domínio ${dominio} não existe.` });
    }

    next();
  } catch (err) {
    res
      .status(500)
      .send({ message: `Erro ao verificar o domínio: ${err.message}` });
  }
};

export default { validEmail };
