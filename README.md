# API - Controle de Usuários

API RESTful desenvolvida para a disciplina de Manutenção de Software e DevOps com o objetivo de realizar o gerenciamento de usuários, autenticação segura e controle de perfis de acesso.

A aplicação foi construída utilizando Node.js, TypeScript, Express, Prisma ORM e MySQL, seguindo uma arquitetura em camadas para facilitar manutenção, escalabilidade e organização do código.

## Repositório

https://github.com/pedrin453/Avalia-o-PBL

---

## Objetivo

Desenvolver uma API REST para gerenciamento de usuários de forma segura e organizada.

A aplicação permite o cadastro e autenticação de usuários, controle de perfis de acesso e administração das contas cadastradas. Para garantir segurança e qualidade, foram utilizadas tecnologias como JWT para autenticação, bcrypt para criptografia de senhas, MySQL para persistência de dados, Docker para padronização do ambiente e GitHub Actions para integração contínua.

---

## Funcionalidades

* Cadastro de usuários
* Login utilizando JWT
* Criptografia de senhas com bcrypt
* Controle de perfis (Administrador e Usuário)
* Listagem de usuários
* Busca de usuário por ID
* Atualização de usuários
* Exclusão de usuários
* Registro de logs de operações
* Registro de sessões de login
* Middleware de autenticação
* Middleware de autorização
* Tratamento de erros
* Docker Compose
* Integração Contínua com GitHub Actions

---

## Tecnologias Utilizadas

### Backend

* Node.js
* TypeScript
* Express

### Banco de Dados

* MySQL
* Prisma ORM

### Segurança

* JWT (JSON Web Token)
* bcrypt

### DevOps

* Docker
* Docker Compose
* GitHub Actions

---

## Estrutura do Projeto

```text
controle-usuarios-api
│
├── .github
│   └── workflows
│       └── ci.yml
│
├── prisma
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations
│
├── src
│   ├── config
│   ├── controllers
│   ├── lib
│   ├── middlewares
│   ├── routes
│   ├── services
│   ├── types
│   ├── utils
│   └── server.ts
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Arquitetura da Aplicação

A aplicação segue uma arquitetura em camadas para separar responsabilidades e facilitar a manutenção do código.

### Controllers

Responsáveis por receber as requisições HTTP e encaminhá-las para os serviços adequados.

### Services

Contêm as regras de negócio da aplicação.

### Routes

Definem os endpoints disponíveis na API.

### Middlewares

Realizam autenticação, autorização e tratamento de erros.

### Utils

Funções auxiliares reutilizáveis.

### Lib

Inicialização de bibliotecas e clientes externos, como o Prisma Client.

---

## Estrutura do Banco de Dados

O sistema possui quatro entidades principais:

### Role

Responsável pelos perfis de acesso do sistema.

Exemplos:

* Administrador
* Usuário

### User

Armazena:

* Nome
* E-mail
* Senha criptografada
* Status
* Data de criação
* Perfil de acesso

### Log

Responsável pelo histórico de operações realizadas pelos usuários.

Exemplos:

* Usuário criado
* Usuário atualizado
* Usuário removido

### Session

Armazena os tokens JWT gerados durante a autenticação.

### Relacionamentos

* Role (1:N) User
* User (1:N) Log
* User (1:N) Session

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://root:root@mysql_controle:3306/controle_usuarios"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

Também é disponibilizado um arquivo `.env.example` para servir como modelo.

---

## Instalação e Execução Local

### Clonar o Repositório

```bash
git clone https://github.com/pedrin453/Avalia-o-PBL.git

cd Avalia-o-PBL
```

### Instalar Dependências

```bash
npm install
```

### Executar Migrações

```bash
npx prisma migrate dev
```

### Popular o Banco de Dados

```bash
npx prisma db seed
```

### Executar a Aplicação

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

---

## Execução com Docker

### Construir e Iniciar os Containers

```bash
docker compose up --build
```

### Aplicar Migrações

```bash
docker exec -it api_controle npx prisma migrate deploy
```

### Executar Seed

```bash
docker exec -it api_controle npx prisma db seed
```

### Encerrar Containers

```bash
docker compose down
```

---

## Autenticação

A API utiliza autenticação baseada em JWT.

Após realizar login, o token retornado deve ser enviado no cabeçalho das requisições protegidas.

Exemplo:

```http
Authorization: Bearer SEU_TOKEN
```

---

## Endpoints

### Autenticação

#### Login

```http
POST /login
```

Responsável por autenticar o usuário e gerar um token JWT.

---

### Usuários

#### Criar Usuário

```http
POST /users
```

Realiza o cadastro de um novo usuário.

#### Listar Usuários

```http
GET /users
```

Acesso restrito a administradores.

#### Buscar Usuário por ID

```http
GET /users/:id
```

Acesso restrito a administradores.

#### Atualizar Usuário

```http
PUT /users/:id
```

Acesso restrito a administradores.

#### Excluir Usuário

```http
DELETE /users/:id
```

Acesso restrito a administradores.

---

## Códigos HTTP Utilizados

| Código | Descrição             |
| ------ | --------------------- |
| 200    | OK                    |
| 201    | Created               |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 500    | Internal Server Error |

---

## Fluxo da Aplicação

```text
Cliente
   ↓
Express
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
Prisma ORM
   ↓
MySQL
   ↓
Resposta JSON
```

---

## Integração Contínua

O projeto utiliza GitHub Actions para validação automática da aplicação.

A cada Push ou Pull Request para a branch principal são executadas as seguintes etapas:

1. Checkout do código
2. Instalação das dependências
3. Geração do Prisma Client
4. Build da aplicação
5. Validação do projeto

---

## Arquivos Complementares

O projeto contém:

* Documentação de decisões do PBL
* Modelo relacional do banco de dados
* Scripts de migração Prisma
* Configuração Docker
* Workflow de CI com GitHub Actions
* Coleção Postman para testes da API

---

## Equipe

| Matrícula   | Nome                                 |
| ----------- | ------------------------------------ |
| 24114290065 | Leonardo Cristian de Sant'Ana Soares |
| 23114290077 | Pedro Francisco Silva de Souza       |
| 24114290045 | Jamylle Cesário Soares Silva         |

---

## Disciplina

Manutenção de Software e DevOps

Professor: Daniel Souza

Turma: OADSNM2BB - ADS030

PBL Selecionado: Caso 9 – Controle Simples de Usuários

---

## Licença

Projeto acadêmico desenvolvido exclusivamente para fins educacionais.
