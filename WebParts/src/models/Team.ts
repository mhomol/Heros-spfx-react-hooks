import { ITeamHeroImages } from "./TeamHeroImages";

export interface ITeam {
  Id: number;
  Title: string;
  FrontHeroId: number;
  MiddleHeroId: number;
  BackHeroId: number;
  Images: ITeamHeroImages;
}
