import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import UserTokensRepository from "../infra/typeorm/repositories/UsersRepository copy";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";
import { IResetPassword } from "../domain/models/IResetPassword";

class ResetPasswordService {
    public async execute({ token, password }: IResetPassword): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);
        if (!userToken) {
            throw new AppError("Token do usuário não encontrado!");
        }

        const user = await usersRepository.findById(userToken.user_id);
        if (!user) {
            throw new AppError("Usuário não existe!");
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);
        if (isAfter(Date.now(), compareDate)) {
            throw new AppError("Token expirado!");
        }

        user.password = await hash(password, 8);
        await usersRepository.save(user);
    }
}

export default ResetPasswordService;