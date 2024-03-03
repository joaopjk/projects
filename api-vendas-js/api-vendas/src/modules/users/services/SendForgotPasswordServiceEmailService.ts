import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import UserTokensRepository from "../infra/typeorm/repositories/UsersRepository copy";
import EtherealMail from "@config/mail/etherealMail";
import { ISendForgotPassword } from "../domain/models/ISendForgotPassword";

class SendForgotPasswordServiceEmailService {
    public async execute({ email }: ISendForgotPassword): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Usuário não encontrado!", 404);
        }

        const token = await userTokensRepository.generate(user.id);
        const forgotPasswordTemplate = path.resolve(__dirname, "..", "views", "forgot_password.hbs");

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: "[Api Vendas] Recuperação de Senha:",
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token?.token}`
                }
            }
        });
    }
}

export default SendForgotPasswordServiceEmailService;