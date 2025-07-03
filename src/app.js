import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'
import {logger} from "./utils/logger.js";
import {errorHandler} from "./utils/errorHandler.js";
process.loadEnvFile("./.env")

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Adoptme API',
            version: '1.0.0',
            description: 'Documentacion API para el proyecto Adoptme',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            }
        }
    },
    apis: ['./src/docs/*.yaml'],
    servers: []
}

const spec = swaggerJSDoc(options)

const app = express();
const PORT = 3000;
const connection = mongoose.connect(process.env.MONGO_URL)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter)

app.use(errorHandler)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec))
app.listen(PORT,()=>{
    logger.info(`Listening on ${PORT}`)
    logger.warn(`Listening on ${PORT}`)
})
