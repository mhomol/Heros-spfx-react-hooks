export interface IHero {
  Id: number;
  Title: string;
  HeroImage: IHeroImage;
  FlavorText: string;
  Element: string;
  Power1: string;
  Power2: string;
  Likes: number;
  Race: string;
}

export interface IHeroImage {
  Url: string;
}
