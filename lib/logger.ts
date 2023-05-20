import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json, prettyPrint } = format;

const appliedTransports = [];

appliedTransports.push(
     
    new transports.Console({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        prettyPrint: true,
    })
);

const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), json(), prettyPrint()),
    transports: appliedTransports,
});

export default logger;
