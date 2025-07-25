export interface Ingredients {
  id: string;
  name: string;
  quanity: string;
  unit: 'tablespoon' | 'teaspoon' | 'cup' | 'kilogram' | 'gram';
}

export interface CreateIngredientsRequest {
  name: string;
  quanity: string;
  unit: 'tablespoon' | 'teaspoon' | 'cup' | 'kilogram' | 'gram';
}