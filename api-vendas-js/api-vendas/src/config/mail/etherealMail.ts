import nodemailer from "nodemailer";
import { HandleBarsMailTemplate } from "./handleBarsMailTemplate";

interface IMailContact {
    name: string;
    email: string;
}

interface ISendEmail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

interface ITemplateVariable {
    [key: string]: any
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

export default class EtherealMail {
    static async sendMail({ to, from, subject, templateData }: ISendEmail): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const mailTemplate = new HandleBarsMailTemplate();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        const message = await transporter.sendMail({
            from: {
                name: from?.name || "Equipe Api Vendas Pjk",
                address: from?.email || "equipePjk@apivendas.com.br"
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData)
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}