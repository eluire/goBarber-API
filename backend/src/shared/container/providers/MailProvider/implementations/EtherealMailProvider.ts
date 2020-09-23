import { inject, injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import mailSettings from "@config/mail";
import ISendMailDTO from "../dtos/ISendEmailDTO";
import IMailProvider from "../models/IMailProvider";
import IMailTemplateProvider from "@shared/container/providers/MailTamplateProvider/models/IMailTemplateProvider";
import mail from "@config/mail";
@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    const transporter = nodemailer.createTransport({
      host: "smtp.googlemail.com", // Gmail Host
      port: 465, // Port
      secure: true, // this is true as port is 465
      auth: {
        user: mailSettings.login, // generated ethereal user
        pass: mail.password, // generated ethereal password
      },
    });
    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || "Equipe Gobarber",
        address: from?.email || "equipe@gobarber.com.br",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log("Message sent: %s", message.messageId);
  }
}
