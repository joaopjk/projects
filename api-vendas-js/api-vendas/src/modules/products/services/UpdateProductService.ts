import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { IUpdateProduct } from "../domain/models/IUpdateProduct";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductRepositoriy";
const chaveCache = "api-vendas-PRODUCT_LIST";

class UpdateProductService {
    public async execute({ id, name, price, quantity }: IUpdateProduct): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);
        const redisCache = new RedisCache();

        var product = await productRepository.findOne(id);
        if (!product) {
            throw new AppError(`Produto com o id:${id} não foi encontrado!`)
        }

        const productExists = await productRepository.findByName(name);
        if (productExists && name !== product.name) {
            throw new AppError(`Já existe um produto com o nome ${name} na base de dados!`);
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);
        await redisCache.invalidate(chaveCache);
        return product;
    }
}

export default UpdateProductService;