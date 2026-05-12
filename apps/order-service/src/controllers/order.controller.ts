// apps/order-service/src/controllers/order.controller.ts

import type { FastifyRequest, FastifyReply } from 'fastify';
import { OrderRepository } from '../repositories/order.repository';
import type { CreateOrderBody } from '../interfaces/create-order.interface';


const repository = new OrderRepository();



export class OrderController {
  async create(
    request: FastifyRequest<{ Body: CreateOrderBody }>, 
    reply: FastifyReply
  ) {
    const { productId, quantity } = request.body;

    // Salva o pedido usando o repositório
    const newOrder = await repository.create({ productId, quantity });

    // Retorna 201 (Created)
    return reply.status(201).send(newOrder);
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const orders = await repository.findAll();
    return orders;
  }
}