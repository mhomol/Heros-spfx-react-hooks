import * as React from "react";
import styles from "./HerosFirst.module.scss";
import { IHerosFirstProps } from "./IHerosFirstProps";
import { useHerosApi, HeroApi, HeroState } from "../../../hooks/useHerosApi";
import { useTeamsApi, TeamsState } from "../../../hooks/useTeamsApi";
import { IHero } from "../../../models/Hero";
import { Like } from "./Like";
import { Loading } from "./Loading";
import { Element } from "./Element";
import { TeamsPopup } from "./TeamsPopup";

/*
HerosFirst Function Component, which is the top-most component used by the Web Part
*/
const HerosFirst: React.FunctionComponent<IHerosFirstProps> = props => {
  //const heroState: HeroState = useHerosApi({ context: props.context });
  const api: HeroApi = useHerosApi({ context: props.context });
  const teamsState: TeamsState = useTeamsApi({ context: props.context });

  return (
    <div className={styles.herosFirst}>
      <Loading
        isLoading={api.state.getRequest.isLoading}
        setRefresh={api.setRefresh}
      />
      {api.state.heros.map((h: IHero) => (
        <div className={styles.heroPanel}>
          <div
            className={styles.heroImage}
            style={{
              backgroundImage: `url(${h.HeroImage.Url})`
            }}
          ></div>
          <div className={styles.heroDetails}>
            <div className={styles.heroTitle}>{h.Title}</div>
            <hr />
            <div className={styles.bottomDetails}>
              <Element hero={h} />
              <div className={styles.powers}>
                <div className={styles.powersTitle}>Race:</div>
                <div>{h.Race}</div>
                <div className={styles.powersTitle}>Powers:</div>
                <div>{h.Power1}</div>
                <div>{h.Power2}</div>
              </div>
              <div className={styles.actions}>
                <Like hero={h} setLike={api.setLike} />
                {props.showTeams ? (
                  <TeamsPopup
                    hero={h}
                    teams={teamsState.request.teams}
                    setHeroTeams={teamsState.setHeroTeams}
                    expandTeam={teamsState.expandTeam}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.errors}>
        {api.state.getRequest.hasError === true ? (
          <span>
            Error retrieving data! <br /> {api.state.getRequest.errorMessage}
          </span>
        ) : (
          <span></span>
        )}
        {api.state.likeRequest.hasError === true ? (
          <span>
            Error retrieving data! <br /> {api.state.likeRequest.errorMessage}
          </span>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default HerosFirst;
