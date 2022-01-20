const { transports, format, createLogger } = require('winston');
const { timestamp, combine, printf, errors, json } = format;

function buildDevLogger() {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`
    })
    return createLogger({
        format: combine(
            format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'combined.log' })]
    })
}



module.exports = buildDevLogger;