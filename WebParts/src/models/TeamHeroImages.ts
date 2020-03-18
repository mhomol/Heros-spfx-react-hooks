import { IHeroImage } from "./Hero";

export interface ITeamHeroImages {
  FrontLineHero: ITeamHeroPreview;
  MidLineHero: ITeamHeroPreview;
  BackLineHero: ITeamHeroPreview;
}

export interface ITeamHeroPreview {
  Id: number;
  Title: string;
  HeroImage: IHeroImage;
}
