import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs"
import { getCustomRepository } from "typeorm";
import { IUpdateProfile } from "../domain/models/IUpdateProfile";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

class UpdateProfileService {
    public async execute({
        user_id,
        name,
        email,
        password,
        old_password
    }: IUpdateProfile): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);
        if (!user)
            throw new AppError("Usuário não encontrado!", 404);

        const userUpdateEmail = await usersRepository.findByEmail(email);
        if (userUpdateEmail && userUpdateEmail.id !== user_id)
            throw new AppError("O email já está sendo utilizado por outro usuário!", 404);

        if (password && !old_password)
            throw new AppError("O password antigo é requerido", 404);

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)
            if (!checkOldPassword)
                throw new AppError("O password antigo não deu match!", 404)

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;