# 📋 Documentação do Projeto - Sujeito Pizza (Backend)

## 📖 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias e Versões](#tecnologias-e-versões)
4. [Organização de Pastas](#organização-de-pastas)
5. [Modelagem do Banco de Dados](#modelagem-do-banco-de-dados)
6. [Endpoints da API](#endpoints-da-api)
7. [Validação de Schemas](#validação-de-schemas)
8. [Middlewares](#middlewares)
9. [Configurações](#configurações)

---

## 🎯 Visão Geral

Sistema backend para gerenciamento de pedidos de pizzaria, desenvolvido em Node.js com TypeScript, utilizando Express para servidor HTTP, Prisma como ORM e PostgreSQL como banco de dados.

---

## 🏗️ Arquitetura

O projeto segue o padrão arquitetural em **camadas (Layered Architecture)**, com a seguinte estrutura:

```
Rotas → Controllers → Services
```

### Fluxo de Dados:
1. **Rotas (Routes)**: Recebem as requisições HTTP e encaminham para os controllers apropriados
2. **Controllers**: Recebem a requisição, extraem os dados necessários e passam para os services
3. **Services**: Contêm a lógica de negócio, comunicam com o banco de dados através do Prisma e retornam o resultado ao controller
4. **Retorno**: Controller retorna a resposta ao usuário

### Características:
- Separação clara de responsabilidades
- Facilita manutenção e testes
- Código organizado e escalável
- Validação centralizada usando middlewares

---

## 🛠️ Tecnologias e Versões

### Dependências de Produção
| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | - | Runtime JavaScript |
| **Express** | ^5.2.1 | Framework web para Node.js |
| **TypeScript** | ^5.9.3 | Superset tipado do JavaScript |
| **Prisma Client** | ^7.4.2 | ORM para comunicação com banco de dados |
| **Prisma Adapter PG** | ^7.4.2 | Adaptador PostgreSQL para Prisma |
| **PostgreSQL (pg)** | ^8.19.0 | Driver do PostgreSQL |
| **JWT (jsonwebtoken)** | ^9.0.3 | Autenticação e autorização via tokens |
| **bcryptjs** | ^3.0.3 | Hash de senhas |
| **Zod** | ^4.3.6 | Validação e parsing de schemas |
| **Multer** | ^2.1.0 | Upload de arquivos |
| **Cloudinary** | ^2.9.0 | Serviço de hospedagem de imagens |
| **Cors** | ^2.8.6 | Habilitar CORS |
| **dotenv** | ^17.3.1 | Gerenciamento de variáveis de ambiente |
| **tsx** | ^4.21.0 | Execução de TypeScript |

### Dependências de Desenvolvimento
| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **@types/node** | ^25.3.2 | Tipos TypeScript para Node.js |
| **@types/express** | ^5.0.6 | Tipos TypeScript para Express |
| **@types/jsonwebtoken** | ^9.0.10 | Tipos TypeScript para JWT |
| **@types/multer** | ^2.0.0 | Tipos TypeScript para Multer |
| **@types/cors** | ^2.8.19 | Tipos TypeScript para Cors |
| **@types/pg** | ^8.18.0 | Tipos TypeScript para PostgreSQL |
| **Prisma** | ^7.4.2 | CLI do Prisma |

### Configuração do TypeScript
- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Habilitado
- **Source Maps**: Habilitados
- **Output Directory**: ./dist
- **Root Directory**: ./src

---

## 📁 Organização de Pastas

```
backend/
├── prisma/                          # Configuração do Prisma ORM
│   ├── schema.prisma                # Schema do banco de dados
│   └── migrations/                  # Histórico de migrações
│       ├── migration_lock.toml
│       └── 20260228214006_create_tables/
│           └── migration.sql
│
├── src/                             # Código fonte da aplicação
│   ├── server.ts                    # Arquivo principal do servidor
│   ├── routes.ts                    # Definição de todas as rotas
│   │
│   ├── @types/                      # Extensões de tipos TypeScript
│   │   └── express/
│   │       └── index.d.ts           # Extensão do Request do Express
│   │
│   ├── config/                      # Configurações externas
│   │   ├── cloudinary.ts            # Configuração do Cloudinary
│   │   └── multer.ts                # Configuração do Multer
│   │
│   ├── controllers/                 # Camada de controle
│   │   ├── user/
│   │   │   ├── CreateUserController.ts
│   │   │   ├── AuthUserController.ts
│   │   │   └── DetailUserController.ts
│   │   ├── category/
│   │   │   ├── CreateCategoryController.ts
│   │   │   ├── EditCategoryController.ts
│   │   │   └── ListCategoryController.ts
│   │   └── product/
│   │       ├── CreateProductController.ts
│   │       ├── DeleteProductController.ts
│   │       ├── ListProductController.ts
│   │       └── ListProductCategoryController.ts
│   │
│   ├── services/                    # Camada de lógica de negócio
│   │   ├── user/
│   │   │   ├── CreateUserService.ts
│   │   │   ├── AuthUserService.ts
│   │   │   └── DetailUserService.ts
│   │   ├── category/
│   │   │   ├── CreateCategoryService.ts
│   │   │   ├── EditCategoryService.ts
│   │   │   └── ListCategoryService.ts
│   │   └── product/
│   │       ├── CreateProductService.ts
│   │       ├── DeleteProductService.ts
│   │       ├── ListProductService.ts
│   │       └── ListProductCategoryService.ts
│   │
│   ├── middlewares/                 # Middlewares customizados
│   │   ├── isAuthenticated.ts       # Verificação de autenticação
│   │   ├── isAdmin.ts               # Verificação de papel admin
│   │   └── validateSchema.ts        # Validação de schemas Zod
│   │
│   ├── schemas/                     # Schemas de validação Zod
│   │   ├── UserSchema.ts
│   │   ├── CategorySchema.ts
│   │   └── ProductSchema.ts
│   │
│   ├── prisma/                      # Cliente Prisma
│   │   └── index.ts                 # Instância do PrismaClient
│   │
│   └── generated/                   # Arquivos gerados pelo Prisma
│       └── prisma/                  # Cliente Prisma gerado
│
├── package.json                     # Dependências e scripts
├── tsconfig.json                    # Configuração do TypeScript
└── prisma.config.ts                 # Configuração adicional do Prisma
```

### Padrões de Organização:
- **Modularização por funcionalidade**: Controllers e Services organizados por entidade (user, category, product)
- **Separação de responsabilidades**: Cada camada tem sua função específica
- **Configurações centralizadas**: Arquivo config/ para configurações de terceiros
- **Tipos customizados**: Extensão de tipos em @types/

---

## 🗄️ Modelagem do Banco de Dados

O banco de dados utiliza **PostgreSQL** com o **Prisma ORM**. Abaixo está a modelagem completa:

### Entidades:

#### 1. **User (Usuário)**
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(STAFF)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("users")
}
```

**Campos:**
- `id`: UUID único do usuário
- `name`: Nome completo
- `email`: Email único (usado para login)
- `password`: Senha hasheada com bcrypt
- `role`: Papel do usuário (STAFF ou ADMIN)
- `createdAt`: Data de criação
- `updatedAt`: Data da última atualização

**Enum de Roles:**
```prisma
enum Role {
  STAFF
  ADMIN
}
```

---

#### 2. **Category (Categoria)**
```prisma
model Category {
  id        String    @id @default(uuid())
  name      String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  products  Product[]
  
  @@map("categories")
}
```

**Campos:**
- `id`: UUID único da categoria
- `name`: Nome da categoria
- `createdAt`: Data de criação
- `updatedAt`: Data da última atualização
- `products`: Relação 1:N com produtos

---

#### 3. **Product (Produto)**
```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  price       Int      // Armazenado em centavos
  description String
  banner      String
  disabled    Boolean  @default(false)
  category_id String
  category    Category @relation(fields: [category_id], references: [id], onDelete: Cascade)
  items       Item[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("products")
}
```

**Campos:**
- `id`: UUID único do produto
- `name`: Nome do produto
- `price`: Preço em centavos (Ex: 1500 = R$ 15,00)
- `description`: Descrição do produto
- `banner`: URL da imagem (armazenada no Cloudinary)
- `disabled`: Se o produto está desabilitado
- `category_id`: ID da categoria (chave estrangeira)
- `category`: Relação N:1 com categoria
- `items`: Relação 1:N com itens de pedido
- `createdAt`: Data de criação
- `updatedAt`: Data da última atualização

**Regras:**
- `onDelete: Cascade`: Ao deletar uma categoria, todos os produtos relacionados são deletados

---

#### 4. **Order (Pedido)**
```prisma
model Order {
  id        String   @id @default(uuid())
  table     Int
  status    Boolean  @default(false) // false = Pendente, true = Pronto
  draft     Boolean  @default(true)  // true = Rascunho, false = Enviado para cozinha
  name      String?
  items     Item[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("orders")
}
```

**Campos:**
- `id`: UUID único do pedido
- `table`: Número da mesa
- `status`: Status do pedido (false = Pendente, true = Pronto)
- `draft`: Se está em rascunho (false = enviado para cozinha)
- `name`: Nome opcional do cliente
- `items`: Relação 1:N com itens
- `createdAt`: Data de criação
- `updatedAt`: Data da última atualização

---

#### 5. **Item (Item do Pedido)**
```prisma
model Item {
  id         String   @id @default(uuid())
  amount     Int
  order_id   String
  order      Order    @relation(fields: [order_id], references: [id], onDelete: Cascade)
  product_id String
  product    Product  @relation(fields: [product_id], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  @@map("items")
}
```

**Campos:**
- `id`: UUID único do item
- `amount`: Quantidade do produto
- `order_id`: ID do pedido (chave estrangeira)
- `order`: Relação N:1 com pedido
- `product_id`: ID do produto (chave estrangeira)
- `product`: Relação N:1 com produto
- `createdAt`: Data de criação
- `updatedAt`: Data da última atualização

**Regras:**
- `onDelete: Cascade`: Ao deletar um pedido/produto, todos os itens relacionados são deletados

---

### Relacionamentos:

```
User (1) ────────────────── (0..n) [Sem relação direta definida]

Category (1) ────────────── (0..n) Product

Product (1) ─────────────── (0..n) Item

Order (1) ───────────────── (0..n) Item
```

---

## 🔌 Endpoints da API

### 👤 **Usuários (Users)**

#### **POST /users**
Criar um novo usuário.

- **Autenticação**: Não requerida
- **Validação**: `createUserSchema`
- **Body**:
  ```json
  {
    "name": "string (min: 3 caracteres)",
    "email": "string (formato email)",
    "password": "string (min: 6 caracteres)"
  }
  ```
- **Retorno**: Dados do usuário criado (sem senha)

---

#### **POST /session**
Autenticar usuário e receber token JWT.

- **Autenticação**: Não requerida
- **Validação**: `authUserSchema`
- **Body**:
  ```json
  {
    "email": "string (formato email)",
    "password": "string (min: 6 caracteres)"
  }
  ```
- **Retorno**: 
  ```json
  {
    "token": "JWT token",
    "user": {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "role": "STAFF | ADMIN"
    }
  }
  ```

---

#### **GET /me**
Obter detalhes do usuário autenticado.

- **Autenticação**: Requerida (`isAuthenticated`)
- **Headers**: 
  ```
  Authorization: Bearer <token>
  ```
- **Retorno**: Dados do usuário logado

---

### 📂 **Categorias (Categories)**

#### **POST /category**
Criar uma nova categoria de produtos.

- **Autenticação**: Requerida (`isAuthenticated`, `isAdmin`)
- **Validação**: `createCategorySchema`
- **Permissão**: Apenas ADMIN
- **Body**:
  ```json
  {
    "name": "string (min: 2 caracteres)"
  }
  ```
- **Retorno**: Dados da categoria criada

---

#### **GET /categories**
Listar todas as categorias.

- **Autenticação**: Requerida (`isAuthenticated`)
- **Retorno**: Lista de categorias

---

#### **PUT /category**
Editar uma categoria existente.

- **Autenticação**: Requerida (`isAuthenticated`)
- **Validação**: `updateCategorySchema`
- **Body**:
  ```json
  {
    "id": "string (uuid)",
    "name": "string (min: 2 caracteres)"
  }
  ```
- **Retorno**: Dados da categoria atualizada

---

### 🍕 **Produtos (Products)**

#### **POST /product**
Criar um novo produto com upload de imagem.

- **Autenticação**: Requerida (`isAuthenticated`, `isAdmin`)
- **Validação**: `createProductSchema`
- **Permissão**: Apenas ADMIN
- **Content-Type**: `multipart/form-data`
- **Body (FormData)**:
  ```
  name: string (min: 1 caractere)
  price: string (valor em centavos)
  description: string (min: 1 caractere)
  category_id: string (uuid)
  file: File (imagem)
  ```
- **Retorno**: Dados do produto criado (com URL da imagem no Cloudinary)

---

#### **GET /products**
Listar todos os produtos.

- **Autenticação**: Requerida (`isAuthenticated`)
- **Retorno**: Lista de produtos com suas categorias

---

#### **POST /product/delete**
Deletar um produto.

- **Autenticação**: Requerida (`isAuthenticated`, `isAdmin`)
- **Permissão**: Apenas ADMIN
- **Body**:
  ```json
  {
    "id": "string (uuid)"
  }
  ```
- **Retorno**: Confirmação de deleção

---

#### **GET /products/category**
Listar produtos por categoria.

- **Autenticação**: Requerida (`isAuthenticated`)
- **Validação**: `listProductsCategorySchema`
- **Body**:
  ```json
  {
    "category_id": "string (uuid)"
  }
  ```
- **Retorno**: Lista de produtos da categoria especificada

---

### 📊 Resumo dos Endpoints

| Método | Endpoint | Autenticação | Admin | Descrição |
|--------|----------|--------------|-------|-----------|
| POST | /users | ❌ | ❌ | Criar usuário |
| POST | /session | ❌ | ❌ | Login |
| GET | /me | ✅ | ❌ | Detalhes do usuário |
| POST | /category | ✅ | ✅ | Criar categoria |
| GET | /categories | ✅ | ❌ | Listar categorias |
| PUT | /category | ✅ | ❌ | Editar categoria |
| POST | /product | ✅ | ✅ | Criar produto |
| GET | /products | ✅ | ❌ | Listar produtos |
| POST | /product/delete | ✅ | ✅ | Deletar produto |
| GET | /products/category | ✅ | ❌ | Produtos por categoria |

---

## ✅ Validação de Schemas

O projeto utiliza **Zod** para validação de dados de entrada. Todos os schemas validam `body`, `query` e `params`.

### 👤 **UserSchema**

#### **createUserSchema**
```typescript
{
  body: {
    name: string (min: 3 caracteres),
    email: string (formato email),
    password: string (min: 6 caracteres)
  }
}
```

#### **authUserSchema**
```typescript
{
  body: {
    email: string (formato email),
    password: string (min: 6 caracteres)
  }
}
```

---

### 📂 **CategorySchema**

#### **createCategorySchema**
```typescript
{
  body: {
    name: string (min: 2 caracteres)
  }
}
```

#### **updateCategorySchema**
```typescript
{
  body: {
    id: string,
    name: string (min: 2 caracteres)
  }
}
```

---

### 🍕 **ProductSchema**

#### **createProductSchema**
```typescript
{
  body: {
    name: string (min: 1 caractere),
    price: string (obrigatório),
    description: string (min: 1 caractere),
    category_id: string
  }
}
```

#### **listProductsCategorySchema**
```typescript
{
  body: {
    category_id: string
  }
}
```

---

### Estrutura de Validação

Todos os schemas seguem o padrão:

```typescript
z.object({
  body: z.object({ /* campos do body */ }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
})
```

**Mensagens de Erro Customizadas:**
- Todas as validações retornam mensagens em português
- Formato de erro:
  ```json
  {
    "error": "Erro validação",
    "details": [
      {
        "path": ["body", "campo"],
        "message": "Mensagem de erro"
      }
    ]
  }
  ```

---

## 🛡️ Middlewares

### 1. **isAuthenticated**
**Arquivo**: `src/middlewares/isAuthenticated.ts`

**Objetivo**: Verificar se o usuário está autenticado através do token JWT.

**Funcionamento**:
1. Extrai o token do header `Authorization`
2. Valida o formato: `Bearer <token>`
3. Verifica a assinatura do token usando `JWT_SECRET`
4. Extrai o `user_id` do token e adiciona em `req.user_id`
5. Permite a continuação da requisição

**Uso**:
```typescript
router.get("/me", isAuthenticated, controller);
```

**Respostas de Erro**:
- **401**: Token não autorizado (ausente ou inválido)

---

### 2. **isAdmin**
**Arquivo**: `src/middlewares/isAdmin.ts`

**Objetivo**: Verificar se o usuário autenticado tem permissão de ADMIN.

**Funcionamento**:
1. Obtém o `user_id` de `req.user_id` (definido pelo `isAuthenticated`)
2. Busca o usuário no banco de dados
3. Verifica se o `role` do usuário é `ADMIN`
4. Permite a continuação se for admin

**Uso**:
```typescript
router.post("/category", isAuthenticated, isAdmin, controller);
```

**Respostas de Erro**:
- **401**: Usuário não autorizado (não encontrado)
- **403**: Acesso negado (usuário não é admin)

**Nota**: Deve sempre ser usado em conjunto com `isAuthenticated`.

---

### 3. **validateSchema**
**Arquivo**: `src/middlewares/validateSchema.ts`

**Objetivo**: Validar dados de entrada usando schemas Zod.

**Funcionamento**:
1. Recebe um schema Zod como parâmetro
2. Valida `body`, `query` e `params` da requisição
3. Se válido, permite a continuação
4. Se inválido, retorna erro 400 com detalhes

**Uso**:
```typescript
router.post("/users", validateSchema(createUserSchema), controller);
```

**Respostas de Erro**:
- **400**: Erro de validação (com detalhes dos campos inválidos)
- **500**: Erro interno do servidor

**Formato de Resposta de Erro**:
```json
{
  "error": "Erro validação",
  "details": [
    {
      "path": ["body", "email"],
      "message": "Precisa ser um email válido"
    }
  ]
}
```

---

### Ordem de Execução dos Middlewares

Para rotas protegidas com validação:
```typescript
router.post(
  "/product",
  isAuthenticated,      // 1º - Verifica autenticação
  isAdmin,              // 2º - Verifica permissão de admin
  upload.single("file"), // 3º - Faz upload do arquivo
  validateSchema(...),   // 4º - Valida os dados
  controller            // 5º - Executa o controller
);
```

---

## ⚙️ Configurações

### Variáveis de Ambiente (.env)

O projeto requer as seguintes variáveis de ambiente:

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"

# JWT
JWT_SECRET="sua_chave_secreta_aqui"

# Servidor
PORT=3333

# Cloudinary
CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_API_KEY="sua_api_key"
CLOUDINARY_API_SECRET="seu_api_secret"
```

---

### Configuração do Multer
**Arquivo**: `src/config/multer.ts`

Upload de arquivos configurado para:
- **Armazenamento**: Memória (buffer)
- **Usado para**: Upload temporário antes de enviar ao Cloudinary

---

### Configuração do Cloudinary
**Arquivo**: `src/config/cloudinary.ts`

Serviço de hospedagem de imagens:
- **Credenciais**: Carregadas do `.env`
- **Uso**: Armazenar banners de produtos

---

### Configuração do Prisma
**Arquivo**: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

**Cliente Gerado**: `src/generated/prisma`

---

### Scripts NPM

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

**Comandos Principais**:
```bash
# Desenvolvimento
npm run dev

# Prisma
npx prisma migrate dev    # Criar nova migração
npx prisma generate       # Gerar cliente Prisma
npx prisma studio         # Interface visual do banco
```

---

### Extensão de Tipos do Express
**Arquivo**: `src/@types/express/index.d.ts`

Adiciona propriedade `user_id` ao objeto `Request` do Express:

```typescript
declare namespace Express {
  export interface Request {
    user_id?: string;
  }
}
```

Usado pelos middlewares de autenticação para passar o ID do usuário entre middlewares.

---

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**:
   - Criar arquivo `.env` na raiz do projeto
   - Preencher com as variáveis necessárias

3. **Executar migrações do banco**:
   ```bash
   npx prisma migrate dev
   ```

4. **Gerar cliente Prisma**:
   ```bash
   npx prisma generate
   ```

5. **Iniciar servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

O servidor estará rodando em `http://localhost:3333` (ou na porta configurada em PORT).

---

## 📝 Observações Importantes

1. **Preços**: Sempre armazenados em centavos no banco de dados
2. **Senhas**: Hasheadas com bcryptjs antes de serem salvas
3. **Tokens JWT**: Devem ser enviados no header `Authorization: Bearer <token>`
4. **Upload de Imagens**: Feito via FormData com campo `file`
5. **Cascade Delete**: Deletar categoria/produto/pedido deleta dados relacionados
6. **Role Padrão**: Novos usuários são criados como STAFF

---

*Documentação gerada em: 04/03/2026*
