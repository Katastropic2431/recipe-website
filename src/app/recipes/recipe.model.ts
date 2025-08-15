import { Ingredients } from "./ingredients.model";

export interface Recipe{
  id: string,
  favourites: boolean,
  title: string,
  ingredients: Ingredients[],
  process: string,
}

export interface createRecipeRequest {
  title: string,
  process: string,
  ingredients: Ingredients[],
  favourites?: boolean,
}