import {logger} from "./logger.js";

export const errorHandler = (error,req,res,next) => {
    logger.error("ocurrio un error " + error.message);

    res.setHeaders("Content-Type", "application/json");
    return res.status(400).json({error: 'error inesperado'});
}
