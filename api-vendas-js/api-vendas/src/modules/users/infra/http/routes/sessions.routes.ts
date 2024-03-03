import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import SessionsController from "../controllers/SessionsController";

const sessionsRouter = Router();
const sessionController = new SessionsController();

sessionsRouter.post("/",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    sessionController.createSession);

export default sessionsRouter;