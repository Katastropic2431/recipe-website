import { Ingredients } from "./ingredients/ingredients.model";

export interface Recipe{
  id: string,
  favourites: boolean,
  title: string,
  ingredients: Ingredients[],
  process: string,
}
