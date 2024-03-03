import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { IProductId } from "../domain/models/IProductId";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductRepositoriy";

class ShowProductService {
    public async execute({ id }: IProductId): Promise<Product | undefined> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);
        if (!product)
            throw new AppError(`O produto com o id:${id} não foi encontrado!`, 404);
        return product;
    }
}

export default ShowProductService;