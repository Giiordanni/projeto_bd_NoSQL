import mongoose from "mongoose";
import SecServices from "../services/secretario.services.js";
import dns from "dns";

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

const validarEmail = async (email) => {
  const dominio = email.split("@").pop();

  return new Promise((resolve, reject) => {
    dns.resolveMx(dominio, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        reject(new Error(`O domínio ${dominio} não existe.`));
      } else {
        resolve(true);
      }
    });
  });
};

const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false; // Verifica se o CPF tem 11 dígitos e não é uma sequência repetida
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
      resto = 0;
  }

  if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
      resto = 0;
  }

  if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
  }

  return true;
}; // Retorna true se o CPF for válido, caso contrário, false

export default { validarEmail, validarCPF };
