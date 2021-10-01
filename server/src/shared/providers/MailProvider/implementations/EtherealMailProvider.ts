import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import { IMailTemplateProvider } from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';

import { ISendMailDTO } from '../contracts/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    if (process.env.NODE_ENV !== 'testing') {
      nodemailer.createTestAccount().then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      });
    }
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    if (process.env.NODE_ENV !== 'testing') {
      const message = await this.client.sendMail({
        from: {
          name: from?.name || 'Equipe WeHealthy',
          address: from?.email || 'equipe@wehealthy.com.br',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });

      console.info('Message sent: $s', message.messageId);
      console.info('Preview URL: $s', nodemailer.getTestMessageUrl(message));
    }
  }
}
