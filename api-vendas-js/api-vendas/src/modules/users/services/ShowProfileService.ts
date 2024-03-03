import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { IShowProfile } from "../domain/models/IShowProfile";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

class ShowProfileService {
    public async execute({ user_id }: IShowProfile): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);
        if (!user)
            throw new AppError("Usuário não encontrado!", 404);

        return user;
    }
}

export default ShowProfileService;