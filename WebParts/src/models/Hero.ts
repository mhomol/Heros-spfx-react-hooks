export interface IHero {
  Id: number;
  Title: string;
  HeroImage: IHeroImage;
  FlavorText: string;
  Element: string;
  CanEvolve_x003f_: boolean;
  Power1: string;
  Power2: string;
  Likes: number;
  Race: string;
}

export interface IHeroImage {
  Url: string;
}
