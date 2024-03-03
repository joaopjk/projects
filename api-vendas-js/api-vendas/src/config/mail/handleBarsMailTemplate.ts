import handlebars from "handlebars";
import fs from 'fs';

interface ITemplateVariable {
    [key: string]: any
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

export class HandleBarsMailTemplate {
    public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' });
        const parseTemplate = handlebars.compile(templateFileContent);
        return parseTemplate(variables);
    }
}