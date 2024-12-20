export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
  user_id?: string | null;
}

export type NewProduct = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'order_index'>;