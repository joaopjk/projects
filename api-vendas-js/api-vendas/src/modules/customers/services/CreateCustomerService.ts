import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomerRepository } from "../domain/repositories/ICustomerRepository";

@injectable()
class CreateCustomerService {
    constructor(
        @inject("CustomerRepository") private customersRepository: ICustomerRepository
    ) { }

    public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {

        const customerEmailExists = await this.customersRepository.findByEmail(email);
        if (customerEmailExists) {
            throw new AppError(`O cliente do ${email} já cadastrado em nosso site!`);
        }

        const customer = await this.customersRepository.create({
            name, email
        });

        return customer;
    }
}

export default CreateCustomerService;