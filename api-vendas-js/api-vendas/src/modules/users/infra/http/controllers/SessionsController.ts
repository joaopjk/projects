import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import CreateSessionsService from "../../../services/CreateSessionsService";

class SessionsController {
    public async createSession(request: Request, reponse: Response): Promise<Response> {
        const { email, password } = request.body;
        const createSession = new CreateSessionsService();
        const user = await createSession.execute({ email, password });
        return reponse.json(instanceToInstance(user));
    }
}

export default SessionsController;