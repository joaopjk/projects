import CustomerRepository from "@modules/customers/infra/typeorm/repositories/CustomerRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductRepositoriy";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ICreateOrder } from "../domain/models/ICreateOrder";
import Order from "../infra/typeorm/entities/Order";
import { OrdersRepository } from "../infra/typeorm/repositories/OrdersRepository";

class CreateOrderService {
    public async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomerRepository);
        const productsRepository = getCustomRepository(ProductRepository);

        const customerExists = await customersRepository.findById(customer_id);
        if (!customerExists)
            throw new AppError("Cliente não existe!", 404);

        const existsProducts = await productsRepository.findAllByIds(products);
        if (!existsProducts.length)
            throw new AppError("Não existe produtos com os Id's informados !", 404);

        const existesProductsIds = existsProducts.map(x => x.id);
        const checkInexistentProducts = products.filter(
            product => !existesProductsIds.includes(product.id)
        );
        if (checkInexistentProducts.length)
            throw new AppError(
                `Não existe produtos com os Id: ${checkInexistentProducts[0].id}`, 404);

        const quantityAvailable = products.filter(
            product => existsProducts.filter(
                p => p.id === product.id
            )[0].quantity < product.quantity
        );
        if (quantityAvailable.length)
            throw new AppError(
                `A quantidade ${quantityAvailable[0].quantity} não está disponível para
                o produto id: ${quantityAvailable[0].id} `, 404);

        const serializedProducts = products.map(
            product => ({
                product_id: product.id,
                quantity: product.quantity,
                price: existsProducts.filter(p => p.id === product.id)[0].price
            })
        )
        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts
        });

        const { order_products } = order;
        const updatedProductQuantity = order_products.map(
            product => ({
                id: product.product_id,
                quantity: existsProducts.filter(
                    p => p.id === product.product_id)[0].quantity - product.quantity
            })
        );

        await productsRepository.save(updatedProductQuantity);

        return order;
    }
}

export default CreateOrderService;