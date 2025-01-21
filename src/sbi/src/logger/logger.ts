import winston from "winston";
import { format, transports, createLogger } from "winston";

const { combine, timestamp, label, printf, colorize, simple } = format

const myFormat = printf(({   level, message, timestamp}) => {
    return `${timestamp} - ${level} : ${message}`;
});

const devLogger = () => {

    return createLogger({
        level: 'info',
        format: combine(
            colorize(),
            simple(),
            label({ label: 'SBI BANK    '}),
            timestamp({ format: 'HH:mm:ss'  }),
            myFormat
        ),
        transports: [
            new transports.Console(),
            new transports.File({   filename: 'combine.log' }),
            new transports.File({   filename: 'error.log', level: 'error'   }),
            new transports.File({   filename: 'info.log', level: 'info'   }),
        ],
        exceptionHandlers: [
            new transports.File({ filename: 'exceptions.log'    }),
        ],
        exitOnError: false,
    });
};

module.exports = devLogger;