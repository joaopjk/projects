import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

@injectable()
class ListCustomersService {
    constructor(
        @inject("CustomerRepository") private customersRepository: ICustomerRepository
    ) { }

    public async execute(): Promise<ICustomer[]> {
        const customers = await this.customersRepository.find();
        if (!customers)
            return [];
        return customers;
    }
}

export default ListCustomersService;