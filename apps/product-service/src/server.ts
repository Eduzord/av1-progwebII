// apps/product-service/src/server.ts

import Fastify from 'fastify';
import { ProductController } from './controllers/product.controller';

const app = Fastify({ logger: true });
const productController = new ProductController();

// Registro das rotas
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);

// Inicialização do servidor
const start = async () => {
  try {
    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Product service rodando em http://localhost:3001');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();