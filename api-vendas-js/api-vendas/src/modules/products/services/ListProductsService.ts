import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductRepositoriy";
import RedisCache from "@shared/cache/RedisCache";

const chaveCache = "api-vendas-PRODUCT_LIST";

class ListProductService {
    public async execute(): Promise<Product[] | undefined> {
        const productsRepository = getCustomRepository(ProductRepository);
        const redisCache = new RedisCache();

        let products = await redisCache.recover<Product[]>(chaveCache);
        if (!products) {
            products = await productsRepository.find();
            await redisCache.save(chaveCache, products);
        }
        return products;
    }
}

export default ListProductService;