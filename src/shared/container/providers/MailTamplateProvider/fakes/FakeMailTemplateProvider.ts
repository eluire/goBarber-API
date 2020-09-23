import IMailTamplateProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
class FakeMailTemplateProvider implements IMailTamplateProvider {
  public async parse(): Promise<string> {
    return "Mail Content";
  }
}

export default FakeMailTemplateProvider;
