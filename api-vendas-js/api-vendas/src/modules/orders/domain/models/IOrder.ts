import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProduct";

export interface IOder {
    id: string;
    customer: Customer;
    order_products: OrdersProducts[];
    created_at: Date;
    updated_at: Date;
}