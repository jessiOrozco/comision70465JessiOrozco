import winston from 'winston';

export const logger = winston.createLogger(
    {
        transports:[
            new winston.transports.Console(
                {
                    level:'debug',
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.timestamp(),
                        winston.format.simple()
                    )
                }
            ),
            new winston.transports.File(
                {
                    level:'warn',
                    filename:'./src/logs/error.log',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json()
                    )

                }
            )
        ]
    }
);