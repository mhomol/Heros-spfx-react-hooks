import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "HerosFirstWebPartStrings";
import HerosFirst from "./components/HerosFirst";
import { IHerosFirstProps } from "./components/IHerosFirstProps";

export interface IHerosFirstWebPartProps {
  showTeams: true;
}

export default class HerosFirstWebPart extends BaseClientSideWebPart<
  IHerosFirstWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IHerosFirstProps> = React.createElement(
      HerosFirst,
      {
        context: this.context,
        showTeams: this.properties.showTeams
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle("showTeams", {
                  onText: strings.ShowTeamsOnText,
                  offText: strings.ShowTeamsOffText,
                  label: strings.ShowTeamsFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
