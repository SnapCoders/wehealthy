import fs from 'fs';
import handlebars from 'handlebars';

import { IParseMailTemplateDTO } from '../contracts/IParseMailTemplateDTO';
import { IMailTemplateProvider } from '../models/IMailTemplateProvider';

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}