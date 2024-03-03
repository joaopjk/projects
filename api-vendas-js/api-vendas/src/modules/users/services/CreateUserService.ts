import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { ICreateUser } from "../domain/models/ICreateUser";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

class CreateUserService {
    public async execute({ name, email, password }: ICreateUser): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const userEmailExists = await usersRepository.findByEmail(email);
        if (userEmailExists) {
            throw new AppError(`${email} já cadastrado em nosso site!`);
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name, email, password: hashedPassword
        });

        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;