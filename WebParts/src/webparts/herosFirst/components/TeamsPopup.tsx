import * as React from "react";
import styles from "./HerosFirst.module.scss";
import {
  HoverCard,
  IExpandingCardProps
} from "office-ui-fabric-react/lib/HoverCard";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { IHero } from "./../../../models/Hero";
import { ITeam } from "./../../../models/Team";
import { ITeamHeroImages } from "../../../models/TeamHeroImages";

export interface ITeamsPopupProps {
  hero: IHero;
  teams: ITeam[];
  setHeroTeams: (IHero) => void; //React.Dispatch<React.SetStateAction<IHero>>;
  expandTeam: (ITeam) => void;
}

export const TeamsPopup: React.FunctionComponent<ITeamsPopupProps> = props => {
  const expandingCardProps: IExpandingCardProps = {
    onRenderCompactCard: _onRenderCompactCard,
    onRenderExpandedCard: _onRenderExpandedCard,
    renderData: props
  };
  return (
    <HoverCard
      expandingCardProps={expandingCardProps}
      instantOpenOnClick={true}
      onCardVisible={() => props.setHeroTeams(props.hero)}
      className={styles.teamsHover}
    >
      <span className={styles.teamsLabel}>View Teams</span>
    </HoverCard>
  );

  function _onRenderCompactCard(props: ITeamsPopupProps): JSX.Element {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          fontWeight: "bold",
          fontSize: 12,
          color: "orange"
        }}
      >
        <h3>{props.hero.Title}</h3>
      </div>
    );
  }

  function _onRenderExpandedCard(props: ITeamsPopupProps): JSX.Element {
    return (
      <div
        style={{
          padding: "16px 24px",
          fontWeight: "bold",
          fontSize: 12,
          color: "orange"
        }}
      >
        {props.teams.map((t: ITeam) => (
          <div>
            <p
              onClick={() => props.expandTeam(t)}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {t.Title}
            </p>
            {teamImagesToShow(t.Images)}
          </div>
        ))}
      </div>
    );
  }

  function teamImagesToShow(images: ITeamHeroImages): JSX.Element {
    if (images !== null && images !== undefined) {
      return (
        <div>
          <img
            style={{ height: 30, width: 30 }}
            src={images.FrontLineHero.HeroImage.Url}
          />
          <img
            style={{ height: 30, width: 30 }}
            src={images.MidLineHero.HeroImage.Url}
          />
          <img
            style={{ height: 30, width: 30 }}
            src={images.BackLineHero.HeroImage.Url}
          />
        </div>
      );
    }
  }
};
