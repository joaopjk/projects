import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { IProductId } from "../domain/models/IProductId";
import { ProductRepository } from "../infra/typeorm/repositories/ProductRepositoriy";
const chaveCache = "api-vendas-PRODUCT_LIST";

class DeleteProductService {
    public async execute({ id }: IProductId): Promise<void> {
        const productRepository = getCustomRepository(ProductRepository);
        const redisCache = new RedisCache();

        var product = await productRepository.findOne(id)
        if (!product) {
            throw new AppError(`O produto com o id:${id} não foi encontrado!`, 404);
        }

        await productRepository.remove(product);
        await redisCache.invalidate(chaveCache);
    }
}

export default DeleteProductService;