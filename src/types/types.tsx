export interface Product {
  quantity: number;
  name: string;
  category_name: string;
}

export interface Order {
  id: number;
  total: string;
  table_name: string;
  created_at: number;
  status: number;
  products: Product[];
}

export type GroupedProduct = {
  name: string;
  quantity: number;
};

export type GroupedOrder = {
  table_name: string;
  products: GroupedProduct[];
};

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
}