import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import OrdersController from "../controllers/OrdersController";

const ordersRoute = Router();
const ordersController = new OrdersController();

ordersRoute.get("/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    ordersController.show);

ordersRoute.post("/",
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required()
        }
    }),
    ordersController.create);

export default ordersRoute;