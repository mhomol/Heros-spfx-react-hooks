import * as React from "react";
import styles from "./HerosFirst.module.scss";
import { IHero } from "./../../../models/Hero";

export interface ILikeProps {
  hero: IHero;
  setLike: (IHero) => void;
}

export const Like: React.FunctionComponent<ILikeProps> = props => {
  return (
    <div className={styles.likeBar}>
      <span>
        {props.hero.Likes} Like{props.hero.Likes === 1 ? "" : "s"}
      </span>
      <a onClick={() => props.setLike(props.hero)} className={styles.like}>
        Like
      </a>
    </div>
  );
};
