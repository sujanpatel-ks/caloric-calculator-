
export interface MealItem {
  food: string;
  calories: number;
}

export interface CalorieResponse {
  totalCalories: number;
  items: MealItem[];
  advice: string;
}

export interface MealEntry {
  id: number;
  input: string;
  response: CalorieResponse;
}
