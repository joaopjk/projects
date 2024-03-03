import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { IUserId } from "../domain/models/IUserId";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

class DeleteUserService {
    public async execute({ id }: IUserId): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);
        if (!user) {
            throw new AppError("Usuário não existe na base de dados !")
        }

        await usersRepository.remove(user);
    }
}

export default DeleteUserService;