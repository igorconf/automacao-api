# API de Automação para Testes

Esta API foi criada para fins de aprendizado de testes e automação de APIs utilizando Node.js, Express e Swagger.

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```
3. Inicie o servidor:
   ```bash
   node server.js
   ```

## Endpoints

- `POST /users/register` - Registro de usuário
- `POST /users/login` - Login de usuário
- `GET /users` - Consulta de usuários
- `POST /transfer` - Transferência de valores
- `GET /api-docs` - Documentação Swagger

## Regras de Negócio
- Login exige usuário e senha
- Não é permitido registrar usuários duplicados
- Transferências para não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00

## Testes
Para testar a API, recomenda-se o uso do Supertest e Jest.

## Documentação
Acesse `/api-docs` para visualizar a documentação Swagger.
