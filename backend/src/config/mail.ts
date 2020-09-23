interface IEmail {
  login: string;
  password: string;
}

export default {
  login: process.env.MAIL_LOGIN,
  password: process.env.MAIL_PASSWORD,
} as IEmail;
