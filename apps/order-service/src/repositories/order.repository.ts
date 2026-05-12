import type { Order } from '../interfaces/order.interface';

const orders: Order[] = [];
let nextId = 1;

export class OrderRepository {
  async create(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const newOrder: Order = {
      id: nextId++,
      productId: orderData.productId,
      quantity: orderData.quantity,
      createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    return orders;
  }
}