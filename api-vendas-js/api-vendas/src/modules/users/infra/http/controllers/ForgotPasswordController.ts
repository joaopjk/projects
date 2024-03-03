import { Request, Response } from "express";
import SendForgotPasswordServiceEmailService from "../../../services/SendForgotPasswordServiceEmailService";

export default class ForgotPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const sendForgetPasswordEmail = new SendForgotPasswordServiceEmailService();
        await sendForgetPasswordEmail.execute({ email });
        return response.status(204).json();
    }
}