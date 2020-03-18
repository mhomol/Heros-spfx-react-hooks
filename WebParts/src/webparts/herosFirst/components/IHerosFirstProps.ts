import {
  BaseClientSideWebPart,
  WebPartContext
} from "@microsoft/sp-webpart-base";

export interface IHerosFirstProps {
  context: WebPartContext;
  showTeams: boolean;
}
