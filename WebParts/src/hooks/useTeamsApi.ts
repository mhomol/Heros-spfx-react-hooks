import { useEffect, useState } from "react";
import { sp } from "@pnp/sp";
import { IHero, IHeroImage } from "../models/Hero";
import { ITeam } from "../models/Team";
import { ITeamHeroImages } from "../models/TeamHeroImages";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { LogHelper } from "../utilities/LogHelper";
import {
  BaseClientSideWebPart,
  WebPartContext
} from "@microsoft/sp-webpart-base";

export interface ITeamsApiProps {
  context: WebPartContext;
}

export interface ITeamsRequest {
  teams: ITeam[];
  hero: IHero;
  isLoading: boolean;
  isError: boolean;
}

export interface TeamsState {
  request: ITeamsRequest;
  setHeroTeams: (IHero) => void; //React.Dispatch<React.SetStateAction<IHero>>;
  expandTeam: (ITeam) => void;
}

export function useTeamsApi(props: ITeamsApiProps): TeamsState {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [hero, setHeroContext] = useState<IHero>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  sp.setup({
    spfxContext: props.context
  });

  /*
  Gets a filtered list of teams, based on whether or not the incoming hero is in any part of a lineup
  */
  async function getTeamsAsync(hero: IHero) {
    if (hero !== null && hero !== undefined) {
      try {
        setIsError(false);
        setIsLoading(true);

        const allItems: ITeam[] = await sp.web.lists
          .getByTitle("Hero Teams")
          .items.filter(
            `Front_x0020_HeroId eq ${hero.Id} or Middle_x0020_HeroId eq ${hero.Id} or Back_x0020_HeroId eq ${hero.Id}`
          )
          .get();
        console.log(allItems);
        setTeams(allItems);

        setHeroContext(undefined); //Finally, reset our hero object so subsequent calls can be made
      } catch (error) {
        console.error(error);
        LogHelper.logError("useTeamsApi", "getTeamsAsync", error);
        setIsError(true);
      }
      setIsLoading(false);
    } else {
      console.log("Fired a blank (get teams)");
    }
  }

  /*
  Fills out the Team Images portion of the team, with an additional call back to the Heros list for the lineup id's of the incoming team
  */
  async function getHeroImagesForTeamAsync(team: ITeam) {
    if (team !== null && team !== undefined) {
      try {
        setIsError(false);
        setIsLoading(true);

        const teamImages: IHero[] = await sp.web.lists
          .getByTitle("Heros")
          .items.filter(
            `Id eq ${team.Front_x0020_HeroId} or Id eq ${team.Middle_x0020_HeroId} or Id eq ${team.Back_x0020_HeroId}`
          )
          .select("Id", "Title", "HeroImage")
          .get();
        console.log(teamImages);
        const newTeams: ITeam[] = teams.map(t => {
          if (t.Id === team.Id) {
            const expandedTeam = {
              ...t,
              Images: {
                FrontLineHero: null,
                MidLineHero: null,
                BackLineHero: null
              }
            };
            teamImages.forEach(ti => {
              switch (ti.Id) {
                case expandedTeam.Front_x0020_HeroId:
                  console.log(`Found Front Line Hero ${ti.Title}`);
                  expandedTeam.Images.FrontLineHero = {
                    Id: ti.Id,
                    Title: ti.Title,
                    HeroImage: ti.HeroImage
                  };
                  break;
                case expandedTeam.Middle_x0020_HeroId:
                  console.log(`Found Mid Line Hero ${ti.Title}`);
                  expandedTeam.Images.MidLineHero = {
                    Id: ti.Id,
                    Title: ti.Title,
                    HeroImage: ti.HeroImage
                  };
                  break;
                case expandedTeam.Back_x0020_HeroId:
                  console.log(`Found Back Line Hero ${ti.Title}`);
                  expandedTeam.Images.BackLineHero = {
                    Id: ti.Id,
                    Title: ti.Title,
                    HeroImage: ti.HeroImage
                  };
                  break;
                default:
                  break;
              }
            });
            return expandedTeam;
          } else {
            return t;
          }
        });
        setTeams(newTeams);

        setHeroContext(undefined); //Finally, reset our hero object so subsequent calls can be made
      } catch (error) {
        console.error(error);
        LogHelper.logError("useTeamsApi", "getHeroImagesForTeamAsync", error);
        setIsError(true);
      }
      setIsLoading(false);
    } else {
      console.log("Fired a blank (get team images)");
    }
  }

  const setHeroTeams = (hero: IHero) => {
    getTeamsAsync(hero);
  };

  const expandTeam = (team: ITeam) => {
    getHeroImagesForTeamAsync(team);
  };

  return {
    request: { teams, hero, isLoading, isError },
    setHeroTeams,
    expandTeam
  };
}
