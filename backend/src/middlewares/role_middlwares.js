
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

export default {isSecretary, isMedico};



