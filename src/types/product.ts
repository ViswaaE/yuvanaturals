export type ProductCategory =
  | "Bath Bars"
  | "Herbal Soaps"
  | "Premium Shampoos"
  | "Organic Skincare"
  | "Lip Care"
  | "Cookies"
  | "Best Sellers"
  | "New Arrivals"
  | "Gift Collections";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  size: string;
  category: ProductCategory;
  collections: ProductCategory[];
  shortDescription: string;
  description: string;
  badge?: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  ingredients: string[];
  benefits: string[];
  directions: string[];
  skinType: string[];
  relatedSlugs: string[];
  frequentlyBoughtWith?: string[];
  customerReviews?: Review[];
}
