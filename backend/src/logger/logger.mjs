import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format; // A maneira mais comum de importar o winston é usar a sintaxe CommonJS, que é o padrão no Node.js.

const myFormat = printf(({ level, message, timestamp}) => {
    return `${timestamp} [${level}]: ${message}`;
});


const logger = createLogger({
    level: 'info', // Define o nível mínimo de log (info, warn, error, etc.)
    format: combine(
        timestamp({format: 'DD-MMM-YYYY HH:mm:ss'}),
        colorize(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'backend/logs/error.log', level: 'error'}),
        new transports.File({filename: 'backend/logs/info.log', level: 'info'})
    ],
    exceptionHandlers: [
        new transports.File({filename: 'backend/logs/exceptions.log'})
    ]
});

export default logger;

