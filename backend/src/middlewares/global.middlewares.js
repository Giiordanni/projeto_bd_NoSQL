import dns from "dns";
import jwt from 'jsonwebtoken';
import logger from '../logger/logger.mjs';

const jwtRequired = (req, res, next) => {
  const token = req.header('authorization')?.split(' ')[1];

  if (!token) {
      logger.warn('Access denied. No token provided.');
      return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
      const decoded = jwt.verify(token, process.env.SECRETJWT);
      req.userId = decoded._id;
      req.userRole = decoded.role;
      next();
  } catch (ex) {
      logger.error('Invalid token.');
      res.status(400).json({ message: 'Invalid token.' });
  }
};

const isMedico = (req, res, next) => {
  if (req.userRole !== 1) {
    logger.warn('Access denied. Not a medico.');
      return res.status(403).json({ message: 'Access denied. Not a medico.' });
  }
  next();
};

const isSecretaria = (req, res, next) => {
  if (req.userRole !== 2) {
    logger.warn('Access denied. Not a secretary.');
      return res.status(403).json({ message: 'Access denied. Not a secretary.' });
  }
  next();
};

const isPaciente = (req, res, next) => {
  if (req.userRole !== 3) {
    logger.warn('Access denied. Not a paciente.');
      return res.status(403).json({ message: 'Access denied. Not a paciente.' });
  }
  next();
}

const validarEmail = async (email) => {
  const dominio = email.split("@").pop();

  return new Promise((resolve, reject) => {
    dns.resolveMx(dominio, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        logger.error(`O domínio ${dominio} não existe.`);
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


const genarateToken = (user, role) => {
  logger.info("Gerando o token de autenticação");
  return jwt.sign(
    { _id: user._id, role: role}, 
    process.env.SECRETJWT, { 
      expiresIn: 86400 
    }); // 24 horas em 
};

export default { validarEmail, validarCPF, jwtRequired, isPaciente, isMedico, isSecretaria, genarateToken };
