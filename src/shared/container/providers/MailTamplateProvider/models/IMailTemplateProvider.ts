import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default interface IMailTemplateProviders {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
