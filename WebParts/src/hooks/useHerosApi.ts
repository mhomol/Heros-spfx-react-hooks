import { useEffect, useReducer, ReducerAction, Dispatch } from "react";
import { sp } from "@pnp/sp";
import { IHero, IHeroImage } from "../models/Hero";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { LogHelper } from "../utilities/LogHelper";
import {
  BaseClientSideWebPart,
  WebPartContext
} from "@microsoft/sp-webpart-base";
import { Action } from "./action";

/********************************************************************** */
/* DEFINING THE PROPERTIES PASSED TO THE API FUNCTION ON INITIALIZATION */
export interface IHeroApiProps {
  context: WebPartContext;
}
/********************************************************************** */

/******************************************************************************** */
/* DEFINING THE BASIC ELEMENTS SURROUNDING THE STATE THAT THIS API NEEDS TO TRACK */
export interface GetRequest {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export interface LikeRequest {
  hasError: boolean;
  errorMessage: string;
}

export interface HeroState {
  heros: IHero[];
  getRequest: GetRequest;
  likeRequest: LikeRequest;
}

export interface HeroApi {
  state: HeroState;
  setRefresh: () => void; //React.Dispatch<React.SetStateAction<boolean>>;
  setLike: (IHero) => void; //React.Dispatch<React.SetStateAction<IHero>>;
}
/******************************************************************************** */

/****************************************************************************************************** */
/* DEFINING THE ACTIONS, WITH TYPES BY PAYLOAD, AND THE REDUCER USED BY THE API TO DETERMINE WHAT TO DO */
export interface HeroArrayPayloadAction extends Action {
  payload: IHero[];
}
export interface HeroPayloadAction extends Action {
  payload: IHero;
}
export class ActionTypes {
  static readonly GET_ALL: string = "GET_ALL";
  static readonly GET_ALL_LOADING: string = "GET_ALL_LOADING";
  static readonly GET_ALL_ERRORED: string = "GET_ALL_ERRORED";
  static readonly LIKE_HERO: string = "LIKE_HERO";
  static readonly LIKE_HERO_ERRORED: string = "LIKE_HERO_ERRORED";
}
function heroReducer(state: HeroState, action: Action) {
  //First establish the type of the payload
  switch (action.type) {
    case ActionTypes.GET_ALL_LOADING:
      return { ...state, getRequest: { isLoading: true, hasError: false } };
    case ActionTypes.GET_ALL:
      var arrayAction: HeroArrayPayloadAction = action as HeroArrayPayloadAction;
      return {
        ...state,
        heros: arrayAction.payload,
        getRequest: { isLoading: false, hasError: false, errorMessage: "" }
      };
    case ActionTypes.GET_ALL_ERRORED:
      return {
        ...state,
        getRequest: {
          isLoading: false,
          hasError: true,
          errorMessage: "Get Hero Failure"
        }
      };
    case ActionTypes.LIKE_HERO:
      var heroAction: HeroPayloadAction = action as HeroPayloadAction;
      const newHeros = state.heros.map(h => {
        //Only replace the record that was LIKED
        return h.Id === heroAction.payload.Id ? heroAction.payload : h;
      });
      return {
        ...state,
        heros: newHeros,
        likeRequest: { hasError: false, errorMessage: "" }
      };
    case ActionTypes.LIKE_HERO_ERRORED:
      return {
        ...state,
        likeRequest: { hasError: true, errorMessage: "Error liking this hero" }
      };
    default:
      throw new Error();
  }
}
/****************************************************************************** */

/************************* */
/* THE API AND ITS EFFECTS */
export function useHerosApi(props: IHeroApiProps): HeroApi {
  const [heroState, heroDispatch] = useReducer(heroReducer, {
    heros: [],
    getRequest: { isLoading: false, hasError: false, errorMessage: "" },
    likeRequest: { hasError: false, errorMessage: "" }
  });

  sp.setup({
    spfxContext: props.context
  });

  /*
  useEffect for getHerosAsync - this effect should only fire once after the DOM loads
  Retrieves all heros
  */
  useEffect(() => {
    getHerosAsync();

    return () => {
      console.log("cleanup");
    };
  }, []);

  /*
  Retrieve everything from the SP List of Heros
  */
  async function getHerosAsync() {
    try {
      //Dispatch the LOADING action
      heroDispatch({ type: ActionTypes.GET_ALL_LOADING });

      const allItems: IHero[] = await sp.web.lists
        .getByTitle("Heros")
        .items.getAll();
      console.log(allItems);

      //Dispatch the GET_ALL action
      heroDispatch({
        type: ActionTypes.GET_ALL,
        payload: allItems
      } as HeroArrayPayloadAction);
    } catch (error) {
      console.error(error);
      LogHelper.logError("useHerosApi", "getHerosAsync", error);
      heroDispatch({ type: ActionTypes.GET_ALL_ERRORED });
    }
  }

  /*
  Increment the like for the passed in hero and update the hero in the SP List Item
  */
  async function likeHerosAsync(hero) {
    //Only trigger a call if a hero is passed in (this way nothing will happen on load)
    try {
      //Increase the Likes property by 1
      hero.Likes += 1;

      //Update the Likes column on the ListItem in SP
      const i = await sp.web.lists
        .getByTitle("Heros")
        .items.getById(hero.Id)
        .update({
          Likes: hero.Likes
        });
      console.log(i);

      //Dispatch the LIKE_HERO action
      heroDispatch({
        type: ActionTypes.LIKE_HERO,
        payload: hero
      } as HeroPayloadAction);
    } catch (error) {
      console.error(error);
      LogHelper.logError("useHerosApi", "likeHerosAsync", error);
      heroDispatch({ type: ActionTypes.LIKE_HERO_ERRORED });
    }
  }

  /*
  setRefresh function
  It will trigger a refresh of the full Heros list
  This function is callable by any components that reference this Api
  */
  const setRefresh = () => {
    getHerosAsync();
  };

  /*
  setLike function
  It will set add a like for the passed-in hero
  This function is callable by any components that reference this Api
  */
  const setLike = (hero: IHero) => {
    likeHerosAsync(hero);
  };

  return {
    state: {
      heros: heroState.heros,
      getRequest: {
        isLoading: heroState.getRequest.isLoading,
        hasError: heroState.getRequest.hasError,
        errorMessage: heroState.getRequest.errorMessage
      },
      likeRequest: heroState.likeRequest
    },
    setRefresh,
    setLike
  };
}
/************************ */
