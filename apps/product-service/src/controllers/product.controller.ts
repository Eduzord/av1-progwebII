import type { FastifyRequest, FastifyReply } from 'fastify';
import { ProductRepository } from '../repositories/product.repository';

// Instanciamos o repositório
const repository = new ProductRepository();

export class ProductController {
  
  // Retorna todos os produtos
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const products = await repository.findAll();
    return products; // O Fastify já converte para JSON e envia status 200
  }

  // Retorna um produto pelo ID
  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    
    // Pede ao repositório para buscar
    const product = await repository.findById(Number(id));

    if (!product) {
      return reply.status(404).send({ error: 'Produto não encontrado' });
    }

    return product;
  }
}