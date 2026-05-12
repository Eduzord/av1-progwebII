// apps/api-gateway/src/server.ts
import Fastify from 'fastify';
import httpProxy from '@fastify/http-proxy';
import 'dotenv/config';

const app = Fastify({ logger: true });

// URLs dos microserviços vindas do ambiente
const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL || 'http://localhost:3002';

// 1. Rota de Health Check local
app.get('/health', async () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      product_service: PRODUCT_SERVICE,
      order_service: ORDER_SERVICE
    }
  };
});

// 2. Proxy para o Product Service
// Tudo que chegar em :3000/products será enviado para :3001/products
app.register(httpProxy, {
  upstream: PRODUCT_SERVICE,
  prefix: '/products',
  rewritePrefix: '/products',
});

// 3. Proxy para o Order Service
// Tudo que chegar em :3000/orders será enviado para :3002/orders
app.register(httpProxy, {
  upstream: ORDER_SERVICE,
  prefix: '/orders',
  rewritePrefix: '/orders',
});

const start = async () => {
  try {
    // O Gateway roda na porta 3000
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 API Gateway rodando em http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();