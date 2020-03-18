import * as React from "react";
import styles from "./HerosFirst.module.scss";
import { IHero } from "./../../../models/Hero";

export interface IElementProps {
  hero: IHero;
}

export const Element: React.FunctionComponent<IElementProps> = props => {
  const fireLogo: any = require("./../../../images/fire-element.png");
  const airLogo: any = require("./../../../images/air-element.png");
  const earthLogo: any = require("./../../../images/earth-element.png");
  const waterLogo: any = require("./../../../images/water-element.png");
  const lightLogo: any = require("./../../../images/light-element.png");
  const darkLogo: any = require("./../../../images/dark-element.png");

  function FireLogo() {
    return <img src={fireLogo} width="35" height="35" />;
  }

  function AirLogo() {
    return <img src={airLogo} width="35" height="35" />;
  }

  function EarthLogo() {
    return <img src={earthLogo} width="35" height="35" />;
  }

  function WaterLogo() {
    return <img src={waterLogo} width="35" height="35" />;
  }

  function LightLogo() {
    return <img src={lightLogo} width="35" height="35" />;
  }

  function DarkLogo() {
    return <img src={darkLogo} width="35" height="35" />;
  }

  function SelectLogo(element: string) {
    switch (element) {
      case "fire":
        return FireLogo();
      case "earth":
        return EarthLogo();
      case "water":
        return WaterLogo();
      case "air":
        return AirLogo();
      case "light":
        return LightLogo();
      case "dark":
        return DarkLogo();
      default:
        return FireLogo();
    }
  }

  return (
    <div className={styles.elementSection}>
      <div className={styles.elements}>
        {SelectLogo(props.hero.Element.toLowerCase())}
      </div>
    </div>
  );
};
