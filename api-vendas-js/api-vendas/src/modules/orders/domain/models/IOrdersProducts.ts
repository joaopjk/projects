import Order from "@modules/orders/infra/typeorm/entities/Order";
import Product from "@modules/products/infra/typeorm/entities/Product";

export interface IOrdersProducts{
    id: string;
    price: number;
    quantity: number;
    order: Order;
    product: Product;
    order_id: string;
    product_id: string;
    created_at: Date;
    updated_at: Date;
}