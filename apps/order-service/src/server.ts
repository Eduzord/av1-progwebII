import Fastify from 'fastify';
import { OrderController } from './controllers/order.controller';

const app = Fastify({ logger: true });
const orderController = new OrderController();

// Rotas
app.post('/orders', orderController.create);
app.get('/orders', orderController.getAll);

// Inicializa o servidor na porta 3002
const start = async () => {
  try {
    await app.listen({ port: 3002, host: '0.0.0.0' });
    console.log('Order service rodando em http://localhost:3002');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();