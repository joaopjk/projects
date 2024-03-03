import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductRepositoriy";
import RedisCache from "@shared/cache/RedisCache";
import { ICreatProduct } from "../domain/models/ICreateProduct";
const chaveCache = "api-vendas-PRODUCT_LIST";

class CreateProductService {
    public async execute({ name, price, quantity }: ICreatProduct): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);
        const redisCache = new RedisCache();

        const productExists = await productRepository.findByName(name);
        if (productExists) {
            throw new AppError(`Já existe um produto com o nome ${name} na base de dados!`);
        }

        const product = productRepository.create({
            name, price, quantity
        })

        await productRepository.save(product);
        await redisCache.invalidate(chaveCache);
        return product;
    }
}

export default CreateProductService;