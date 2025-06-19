export interface Ingredients {
  id: string;
  name: string;
  quanity: string;
  unit: 'tablespoon' | 'teaspoon' | 'cup' | 'kilogram' | 'gram';
}
