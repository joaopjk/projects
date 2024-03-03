import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { IUpdateCustomer } from "../domain/models/IUpdateCustomer";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

@injectable()
class UpdateCustomerService {
    constructor(
        @inject("CustomerRepository") private customersRepository: ICustomerRepository
    ) { }
    public async execute({
        id,
        name,
        email
    }: IUpdateCustomer): Promise<Customer> {
        const customer = await this.customersRepository.findById(id);
        if (!customer)
            throw new AppError("Usuário não encontrado!", 404);

        const customerEmailExists = await this.customersRepository.findByEmail(email);
        if (customerEmailExists && customerEmailExists.email !== email)
            throw new AppError("O email já está sendo utilizado por outro cliente!", 400);

        customer.name = name;
        customer.email = email;

        await this.customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;