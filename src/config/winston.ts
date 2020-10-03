
import { createLogger, format, transports } from 'winston';
const { label, combine, timestamp, prettyPrint } = format;

const options = {
    file: {
        level: 'info',
        filename: process.cwd() + '/logs/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

let alignColorsAndTime = format.combine(
    format.colorize({
        all: true
    }),
    format.label({
        label: '[LOGGER]'
    }),
    format.timestamp({
        format: "YY-MM-DD HH:MM:SS"
    }),
    format.printf(
        info => `[${info.timestamp}  ${info.level}] : ${info.message}`
    )
);

export const logger = createLogger({
    format: combine(
        timestamp(),
        prettyPrint(),
    ),
    transports: [
        new transports.File(options.file),
        new transports.Console({ format: format.combine(format.colorize(), alignColorsAndTime) })
    ],
    exitOnError: false, // do not exit on handled exceptions
});

export class ServerStream {
    write(message: string) {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
};