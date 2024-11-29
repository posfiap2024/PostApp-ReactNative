# API de gerenciamento de Postagens

## Descrição

Este projeto apresenta uma API desenvolvida utilizando o framework Nest.js em atendimento aos requisitos Tech Challenge. <br><br>
Link de demonstração do projeto: https://1drv.ms/v/s!AoBQZI23SSOpeiVFo8xE4A8XA-I?e=klPK3s

## Estrutura do Projeto
A API está estruturada da seguinte forma:

- Framework: NestJS
- Banco de Dados: PostgreSQL
- Containerização: Docker
- Orquestração: Docker Compose

## Docker Compose

O gerenciamento dos containers é realizado através do Docker Compose. O arquivo docker-compose.yml define dois serviços principais: o banco de dados PostgreSQL e a API.


## Endpoints
A API está estruturada para gerenciar postagens e usuários. Abaixo estão descritos os endpoints disponíveis para o recurso Postagens:

### Postagens

#### Criar Postagem
  - **Método**: `POST /posts`
  - **Descrição**: Cria uma nova postagem.
  - **Parâmetros de Requisição**:
  - **Body**: Objeto JSON com os seguintes campos:
    - `title`: Título da postagem.
    - `content`: Conteúdo da postagem.
    - `status`: Status da postagem.
  - **Autenticação/Autorização**: Requer que o usuário esteja autenticado.
  - **Resposta**: Detalhes da postagem criada.

#### Listar Postagens
  - **Método**: `GET /posts`
  - **Descrição**: Recupera uma lista de postagens publicadas com paginação.
  - **Parâmetros de Consulta**:
    - `limit` (opcional): Número máximo de postagens a serem retornadas (padrão: 10).
    - `page` (opcional): Número da página para paginação (padrão: 1).
  - **Autenticação/Autorização**: Não requer que o usuário esteja autenticado.
  - **Resposta**: Lista de postagens publicadas.

#### Pesquisar Postagens
  - **Método**: `GET /posts/search`
  - **Descrição**: Pesquisa postagens com base em um termo de busca.
  - **Parâmetros de Consulta**:
    - `q`: Termo de pesquisa.
    - `limit` (opcional): Número máximo de postagens a serem retornadas (padrão: 10).
    - `page` (opcional): Número da página para paginação (padrão: 1).
  - **Autenticação/Autorização**: Não requer que o usuário esteja autenticado.
  - **Resposta**: Lista de postagens que contenham o termo de busca no titulo ou no conteúdo.

#### Listar Todas as Postagens (Admin)
  - **Método**: `GET /posts/admin`
  - **Descrição**: Recupera uma lista de todas as postagens. 
  - **Parâmetros de Consulta**:
  - `limit` (opcional): Número máximo de postagens a serem retornadas (padrão: 10).
  - `page` (opcional): Número da página para paginação (padrão: 1).
  - **Autenticação/Autorização**: Requer autenticação e apenas usuários do tipo admin ou professor são autorizados.
  - **Resposta**: Lista de todas as postagens, estejam elas publicadas ou ainda como rascunho.

#### Recuperar Postagem Específica
  - **Método**: `GET /posts/:id`
  - **Descrição**: Recupera uma postagem específica com base no ID.
  - Parâmetros de URL:
    - `id`: ID da postagem a ser recuperada.
  - **Autenticação/Autorização**: Não requer que o usuário esteja autenticado.
  - **Resposta**: Detalhes da postagem específica.

#### Atualizar Postagem
  - **Método**: `PATCH /posts/:id` ou `PUT /posts/:id`
  - **Descrição**: Atualiza uma postagem existente.
  - Parâmetros de URL:
  - id: ID da postagem a ser atualizada.
  - **Parâmetros de Requisição**:
    - **Body**: Objeto JSON com os seguintes campos (opcionais):
      - `title`: Novo título da postagem.
      - `content`: Novo conteúdo da postagem.
      - `status`: Novo status da postagem.
  - **Autenticação/Autorização**: Requer autenticação e apenas usuários do tipo admin ou professor são autorizados.
  - **Resposta**: Confirmação da atualização.

#### Excluir Postagem
  - **Método**: `DELETE /posts/:id`
  - **Descrição**: Exclui uma postagem existente.
  - Parâmetros de URL:
    - `id`: ID da postagem a ser excluída.
  - **Autenticação/Autorização**: Requer autenticação e apenas usuários do tipo admin ou professor são autorizados.
  - **Resposta**: Confirmação da exclusão.

---

### Usuários:

- **Criar Usuário**
  - **Método**: `POST /users`
  - **Descrição**: Cria um novo usuário com um papel especificado. Não requer autenticação.
  - **Parâmetros de Requisição**:
    - **Body**: Objeto JSON com os seguintes campos:
      - `username`: Nome de usuário.
      - `password`: Senha do usuário.
      - `role`: Papel do usuário (admin, professor, student).
  - **Autenticação/Autorização**: Não requer que o usuário esteja autenticado.
  - **Resposta**: ID do usuário criado.

- **Listar Todos os Usuários**
  - **Método**: `GET /users`
  - **Descrição**: Recupera uma lista de todos os usuários com paginação. 
  - **Parâmetros de Consulta**:
    - `limit` (opcional): Número máximo de usuários a serem retornados (padrão: 10).
    - `page` (opcional): Número da página para paginação (padrão: 1).
  - **Autenticação/Autorização**: Requer autenticação e permissões de admin.
  - **Resposta**: Lista de todos os usuários.

- **Recuperar Usuário Específico**
  - **Método**: `GET /users/:id`
  - **Descrição**: Recupera um usuário específico com base no ID.
  - **Parâmetros de URL**:
    - `id`: ID do usuário a ser recuperado.
  - **Autenticação/Autorização**: Não requer que o usuário esteja autenticado.
  - **Resposta**: Detalhes do usuário específico.

- **Atualizar Usuário**
  - **Método**: `PATCH /users/:id` out `PUT /users/:id`
  - **Descrição**: Atualiza as informações de um usuário existente. 
  - **Parâmetros de URL**:
    - `id`: ID do usuário a ser atualizado.
  - **Parâmetros de Requisição**:
    - **Body**: Objeto JSON com os seguintes campos (opcionais):
      - `username`: Novo nome de usuário.
      - `password`: Nova senha.
      - `role`: Novo papel do usuário.
  - **Autenticação/Autorização**: Requer autenticação e permissões de admin.
  - **Resposta**: Confirmação da atualização.

- **Excluir Usuário**
  - **Método**: `DELETE /users/:id`
  - **Descrição**: Exclui um usuário existente. Requer autenticação.
  - **Parâmetros de URL**:
    - `id`: ID do usuário a ser excluído.
  - **Autenticação/Autorização**: Requer autenticação e permissões de admin.
  - **Resposta**: Confirmação da exclusão.

---

## Requisitos de Instalação

Para configurar e executar a API, você precisa dos seguintes componentes:

- **Docker**: Ferramenta de containerização que permite empacotar a aplicação e suas dependências em containers.

## Instalação e Configuração

### Passo 1: Clonar o Repositório

Clone o repositório do projeto para seu ambiente local:

```bash
git clone https://github.com/posfiap2024/postappback.ts.git
cd postappback.ts
```

### Passo 2: Configurar Docker e Docker Compose

Certifique-se de que o Docker e o Docker Compose estão instalados e em execução no seu sistema. Se não estiverem, você pode baixá-los e instalá-los a partir dos seguintes links:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Passo 3: Construir e Iniciar os Containers

Antes de iniciar o container, é preciso que sejam definidas as variáveis de ambiente a serem utilizadas pelo app. Basta preencher os valores dentro do arquivo `.env` como o exemplo abaixo:

```bash
PORT= 3000
POSTGRES_HOST= postgres
POSTGRES_PORT= 5432
POSTGRES_USER= root
POSTGRES_PASSWORD= root
POSTGRES_DB= postapp
JWT_SECRET= 'secret'
```

No diretório raiz do projeto, execute o seguinte comando para construir e iniciar os containers definidos no arquivo `docker-compose.yml`:

```bash
docker-compose up
```

Este comando fará o seguinte:

- **Construirá** a imagem Docker para a aplicação (`app`) com base no `Dockerfile.development`.
- **Iniciará** os containers para a aplicação e o banco de dados PostgreSQL.
- **Mapeará** as portas locais para os containers:
  - `3000:3000` para a aplicação.
  - `5432:5432` para o PostgreSQL.

Para executar o Docker Compose em segundo plano, utilize a flag `-d`. Se precisar forçar a **construção** do container, adicione a flag `--build`. O Docker, por padrão, verifica se a imagem necessária já existe. Caso não exista, o Docker automaticamente realizará a construção da imagem antes de iniciar os containers.


### Passo 4: Acessar a API

Após os containers serem iniciados, a API estará disponível no seguinte endereço: `http://localhost:3000`

Você pode usar ferramentas como [Postman](https://www.postman.com/) ou `curl` para testar os endpoints da API.

### Passo 5: Parar e Remover os Containers

Para parar os containers, use o seguinte comando:

```bash
docker-compose down
```

Este comando interrompe os containers e remove os volumes temporários criados durante a execução.

## Notas Adicionais

- **Persistência de Dados**: O banco de dados PostgreSQL utiliza um volume Docker (`pgdata`) para persistir os dados entre reinicializações dos containers.
- **Logs**: Os logs da aplicação e do banco de dados podem ser visualizados no terminal onde o `docker-compose` foi iniciado. Para logs detalhados, você pode usar o comando `docker-compose logs`.


<!-- 
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->
