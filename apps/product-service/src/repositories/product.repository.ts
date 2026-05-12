import type { Product } from '../interfaces/product.interface';

// Nossos dados em memória
const products: Product[] = [
  { id: 1, name: 'Notebook Pro', price: 3500, stock: 10 },
  { id: 2, name: 'Smartphone', price: 2000, stock: 25 },
  { id: 3, name: 'Teclado Mecânico', price: 300, stock: 50 }
];

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return products;
  }

  async findById(id: number): Promise<Product | undefined> {
    return products.find(p => p.id === id);
  }
}