const { transports, format, createLogger } = require('winston');
const { timestamp, combine, printf, errors, json } = format;

function buildProdLogger(){
    return createLogger({
        format: combine(
            format.colorize(),
            timestamp(),
            errors({ stack: true }),
            json()
        ),
        defaultMeta: { service: 'user-service' },
        transports: [new transports.Console()]
    })
}



module.exports = buildProdLogger;