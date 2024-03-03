import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import authConfig from "@config/auth";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import { IRequestCreateSession, IResposeCreateSession } from "../domain/models/ICreateSession";

class CreateSessionsService {
    public async execute({ email, password }: IRequestCreateSession): Promise<IResposeCreateSession> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Usuário ou senha inválidos !", 401);
        }

        const passwordConfirmed = await compare(password, user.password);
        if (!passwordConfirmed) {
            throw new AppError("Usuário ou senha inválidos !", 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return { user, token };
    }
}

export default CreateSessionsService;