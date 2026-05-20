# Avaliação 1 - Programação Web II
## Sistema Distribuído de Microsserviços com Docker

Este projeto consiste em uma arquitetura de microsserviços desenvolvida em Node.js com Fastify e TypeScript. O objetivo principal é demonstrar a comunicação síncrona via HTTP/REST entre serviços isolados, o roteamento centralizado por meio de um API Gateway e a orquestração completa do ecossistema utilizando Docker e Docker Compose.

---

## Estrutura do Projeto

O projeto adota o padrão de Monorepo (utilizando npm Workspaces), estruturado da seguinte forma:

- **apps/product-service**: Catálogo de produtos (Porta interna: 3001).
- **apps/order-service**: Gerenciamento de pedidos enriquecidos via comunicação HTTP com o serviço de produtos (Porta interna: 3002).
- **apps/api-gateway**: Ponto único de entrada e proxy reverso para o ecossistema (Porta pública: 3000).

---

## Instalação e Dependências

Ao clonar o repositório, certifique-se de estar na pasta raiz do projeto (o diretório que contém a pasta `apps` e o arquivo `package.json` global) e execute o comando abaixo para instalar todas as dependências do ecossistema de forma centralizada:

```bash
npm install
```

## Configuração das variáveis de ambiente

Para que a comunicação entre os microsserviços ocorra corretamente, é obrigatória a criação de arquivos `.env` específicos dentro dos diretórios correspondentes.

Nota: Os valores abaixo estão configurados com os nomes dos serviços na rede interna do Docker. Para testes puramente locais fora do container, substitua os nomes dos serviços por `localhost`.

 1. API Gateway

 Crie o arquivo `apps/api-gateway/.env`

```Snippet de código
PRODUCT_SERVICE_URL=http://product-service:3001
ORDER_SERVICE_URL=http://order-service:3002
 ```

  2. Order Service

 Crie o arquivo `apps/order-service/.env`

```Snippet de código
PRODUCT_SERVICE_URL=http://product-service:3001
 ```

 ## Modos de execução

 ### Opção A: Execução local automatizada 
 Caso queira rodar o projeto localmente via Node.js sem Docker, você pode iniciar cada serviço em terminais separados a partir da raiz do projeto, utilizando os scripts globais mapeados:

 ```bash
 # Terminal 1: Inicia o serviço de produtos
npm run product

# Terminal 2: Inicia o serviço de pedidos
npm run order

# Terminal 3: Inicia o API Gateway
npm run gateway
```

### Opção B: Orquestração em Containers com Docker

Para construir as imagens isoladas e inicializar os três serviços em seus respectivos containers de forma automatizada, execute o comando a seguir na raiz do projeto:

```bash
docker-compose up --build
```

### Observação sobre a Visualização no Docker Desktop:
O Docker Compose agrupa os microsserviços sob o escopo do projeto (ex: av-1). Por padrão, a interface gráfica do Docker Desktop pode exibir os serviços compactados em uma única linha mãe.

* Para visualizar o consumo individual de recursos, clique na seta de expansão localizada ao lado do nome do projeto na interface.

* Alternativamente, use o terminal para listar os containers ativos e independentes com o comando:

```bash
docker ps
```

### Endpoints Disponíveis(Via API Gateway - Porta 3000)

Após iniciar os serviços, todas as requisições devem ser direcionadas exclusivamente para a porta 3000 do Gateway. O Gateway se encarregará do roteamento interno.

* Health Check do Sistema: `GET http://localhost:3000/health`

* Listar Produtos: `GET http://localhost:3000/products`

* Criar Pedido Enriquecido: `POST http://localhost:3000/orders`

 _Exemplo de Payload para criação de pedido:_ 
 ```json
 {
  "productId": 1,
  "quantity": 3
}
```