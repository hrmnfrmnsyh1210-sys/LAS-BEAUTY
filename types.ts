export interface Product {
  id: string;
  name: string;
  type: "Day" | "Night" | "Toner";
  description: string;
  volume: string;
  benefits: string[];
  ingredients: string[];
  image: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  productIds: string[];
  image: string;
  badge?: string;
}
