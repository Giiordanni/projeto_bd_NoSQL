
const isSecretary = (req, res, next) => {
    if (req.userRole !== 'secretary') {
        return res.status(403).json({ message: 'Access denied. Not a secretary.' });
    }
    next();
};

const isMedico = (req, res, next) => {
    if (req.userRole !== 'medico') {
        return res.status(403).json({ message: 'Access denied. Not a medico.' });
    }
    next();
};

const isPaciente = (req, res, next) => {
    if (req.userRole !== 'paciente') {
        return res.status(403).json({ message: 'Access denied. Not a paciente.' });
    }
    next();
}

export default {isSecretary, isMedico, isPaciente};



