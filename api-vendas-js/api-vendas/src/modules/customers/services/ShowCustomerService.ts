import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomerId } from "../domain/models/ICustomerId";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

@injectable()
class ShowCustomerService {
    constructor(
        @inject("CustomerRepository") private customersRepository: ICustomerRepository
    ) { }
    public async execute({ id }: ICustomerId): Promise<ICustomer> {
        const customer = await this.customersRepository.findById(id);
        if (!customer)
            throw new AppError("Cliente não encontrado!", 404);

        return customer;
    }
}

export default ShowCustomerService;