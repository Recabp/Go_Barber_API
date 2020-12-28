interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTempleteDTO {
  file: string;
  variables: ITemplateVariables;
}
