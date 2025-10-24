export interface Ingredients {
  id: string;
  name: string;
  quantity: number;
  unit: 'tablespoon' | 'teaspoon' | 'cup' | 'kilogram' | 'gram';
}

export interface CreateIngredientsRequest {
  name: string;
  quantity: number;
  unit: 'tablespoon' | 'teaspoon' | 'cup' | 'kilogram' | 'gram';
}