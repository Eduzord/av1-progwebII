export interface Order {
  id: number;
  productId: number;
  productName?: string; // Campo opcional para facilitar a resposta
  quantity: number;
  total: number;
  createdAt: string;
}