import { ITeamHeroImages } from "./TeamHeroImages";

export interface ITeam {
  Id: number;
  Title: string;
  Front_x0020_HeroId: number;
  Middle_x0020_HeroId: number;
  Back_x0020_HeroId: number;
  Images: ITeamHeroImages;
}
