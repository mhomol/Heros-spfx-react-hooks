declare interface IHerosFirstWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ShowTeamsFieldLabel: string;
  ShowTeamsOnText: string;
  ShowTeamsOffText: string;
}

declare module "HerosFirstWebPartStrings" {
  const strings: IHerosFirstWebPartStrings;
  export = strings;
}
