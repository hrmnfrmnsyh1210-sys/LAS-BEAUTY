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

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  product: string;
  imageBefore?: string;
  imageAfter?: string;
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
