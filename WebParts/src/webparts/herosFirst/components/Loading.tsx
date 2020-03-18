import * as React from "react";
import styles from "./HerosFirst.module.scss";

export interface IRefreshProps {
  isLoading: boolean;
  setRefresh: () => void; //React.Dispatch<React.SetStateAction<boolean>>;
}

export const Loading: React.FunctionComponent<IRefreshProps> = props => {
  return (
    <div className={styles.loadingBar}>
      {props.isLoading === true ? <span>Loading...</span> : <span>Done!</span>}
      &nbsp;&nbsp;&nbsp;
      <a className={styles.refresh} onClick={() => props.setRefresh()}>
        Refresh
      </a>
    </div>
  );
};
