export interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  stock: number;
  price: number;
}
