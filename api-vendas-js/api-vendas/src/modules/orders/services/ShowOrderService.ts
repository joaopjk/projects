import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { IOrderId } from "../domain/models/IOrderId";
import Order from "../infra/typeorm/entities/Order";
import { OrdersRepository } from "../infra/typeorm/repositories/OrdersRepository";

class ShowOrderService {
    public async execute({ id }: IOrderId): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const order = await ordersRepository.findById(id);
        if (!order)
            throw new AppError("A ordem não existe", 404);

        return order;
    }
}

export default ShowOrderService;