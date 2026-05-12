

import type { FastifyRequest, FastifyReply } from 'fastify';
import { OrderRepository } from '../repositories/order.repository';



const repository = new OrderRepository();


const PRODUCT_SERVICE_URL = (process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001').replace(/\/$/, '');

interface CreateOrderBody {
  productId: number;
  quantity: number;
}

export class OrderController {
  async create(
    request: FastifyRequest<{ Body: CreateOrderBody }>, 
    reply: FastifyReply
  ) {
    const { productId, quantity } = request.body;

    try {

      const response = await fetch(`${PRODUCT_SERVICE_URL}/products/${productId}`);

      //Verifica se o produto existe no outro serviço
      if (!response.ok) {
        return reply.status(404).send({ 
          error: 'Produto não encontrado no Product Service',
          service_origin: 'product-service' 
        });
      }

      const product = await response.json() as { name: string; price: number };

      
      const newOrder = await repository.create({ 
        productId, 
        quantity,
        productName: product.name,
        total: product.price * quantity
      });

      return reply.status(201).send(newOrder);

    } catch (error) {
      
      return reply.status(503).send({ error: 'Serviço de produtos indisponível' });
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const orders = await repository.findAll();
    return orders;
  }
}