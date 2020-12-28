import IParseMailTempleteDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTempleteDTO): Promise<string>;
}
