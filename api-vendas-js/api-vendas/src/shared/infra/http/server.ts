import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/infra/typeorm";
import { errors } from "celebrate";
import uploadConfig from "@config/upload";
import rateLimiter from "./middlewares/rateLimiter";
import "@shared/container";

const app = express();
app.use(cors()); //Aceitando qualquer origem
app.use(express.json()) //Configurando a aplicação para interpretar Json
app.use(rateLimiter)
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors()); // Handler de captura de error do celebrate
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
        errorMessage: error.message
    });
}); //handler de captura de error

app.listen(3333, () => {
    console.log("Server started on port 3333!");
})