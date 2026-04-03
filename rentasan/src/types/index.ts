export type RentalDuration = 'daily' | 'weekly' | 'monthly';

export interface RentalPrice {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  images: string[];
  price: RentalPrice;
  rating: number;
  reviewCount: number;
  available: boolean;
  location: string;
  isUserListed: boolean;
  listedBy?: string;
  features: string[];
  deposit: number;
  minDuration: number; // days
  tags: string[];
}

export interface CartItem {
  product: Product;
  duration: number; // days
  durationType: RentalDuration;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  listings: string[]; // product IDs
}

export interface ProductListing {
  name: string;
  category: string;
  description: string;
  images: string[];
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  deposit: number;
  location: string;
  features: string[];
  minDuration: number;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  duration: RentalDuration;
  rating: number;
  location: string;
  search: string;
}
