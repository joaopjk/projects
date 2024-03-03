import User from "@modules/users/infra/typeorm/entities/User";

export interface IRequestCreateSession {
    email: string;
    password: string;
}

export interface IResposeCreateSession {
    user: User;
    token: string;
}