export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  fabric_type: string;
  sizes: string[];
  images: string[];
  featured: boolean;
  inStock: boolean; // Utilisation de inStock partout
  created_at?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
}