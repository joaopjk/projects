import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import uploadConfig from "@config/upload";
import fs from "fs";
import User from "../infra/typeorm/entities/User";
import { IUpdateUserAvatar } from "../domain/models/IUpdateUserAvatar";

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: IUpdateUserAvatar): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        let user = await userRepository.findById(user_id);
        if (!user) {
            throw new AppError("Usuário não encontrado !");
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        await userRepository.save(user);
        return user;
    }
}

export default UpdateUserAvatarService;