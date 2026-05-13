# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copia os arquivos de pacotes
COPY package*.json ./

# 2. Instala TUDO (incluindo devDependencies) e força os tipos do Node e TS

RUN npm install && \
    npm install -D typescript @types/node

# 3. Copia o restante dos arquivos
COPY tsconfig.json ./
COPY src ./src

# 4. Roda o build (o npx vai usar o tsc que instalamos acima)
RUN npx tsc --project tsconfig.json

# Stage 2: Produção (Mantém como estava, mas garanta que o CMD aponte para o local certo)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/server.js"]