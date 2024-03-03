import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { ICustomerId } from "../domain/models/ICustomerId";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

@injectable()
class DeleteCustomerService {
    constructor(
        @inject("CustomerRepository") private customersRepository: ICustomerRepository
    ) { }
    public async execute({ id }: ICustomerId): Promise<void> {
        const customer = await this.customersRepository.findById(id);
        if (!customer)
            throw new AppError("Cliente não encontrado!", 404);

        await this.customersRepository.remove(customer);
    }
}

export default DeleteCustomerService;