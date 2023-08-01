# Projeto labecommerce

É o primeiro projeto do back-end, onde praticamos toda a base de criação de uma API vinculada a um banco de dados real.<br><br>
Ele tem uma particularidade: seus requisitos são implementados ao longo dos exercícios pós aula. Isso significa que caso você siga o desenvolvimento das aulas, quando chegar na data de entrega já terá um projeto funcional.

<details>
<summary>O que fazer nas sexta-feiras já que o projeto é feito durante a semana com os exercícios pós-aula?</summary>

```
- rever aulas que você não pôde assistir

- fazer exercícios que você deixou para trás

- rever conteúdos que você está com dificuldade

- praticar lógica de programação
    - https://www.codewars.com/
    - https://leetcode.com/
```
</details>

<br>
### Conteúdos abordados
- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman

# ⚠⚠⚠ Importante!!! ⚠⚠⚠
Para critérios de correção serão considerados rigorosamente a nomenclatura de: Tabelas, colunas e caminhos(path) das requisições. Portando, siga o padrão de nomenclaturas apresentado logo abaixo.

## Banco de dados 🎲🎲
O nome das tabelas e das colunas devem ser em letras minúsculas, sem acento, sem caracteres especiais e em _snake_case_(caso sejas palavras compostas. exp.: arco_iris). Por isso, siga restritamente a nomeclatura proposta!

O banco de dados deve conter obrigatóriamente quatro tabelas:

## Tabela de Usuários: 
### Nome da Tabela:
- users
### Nome das colunas
- id
- name
- email
- password
- created_at

## Tabela de Produtos 🛒🛒
### Nome da Tabela:
- products
### Nome das colunas
- id 
- name
- price
- description
- image_url

### Tabela de Registro de Compras 💸💸

### Nome da Tabela:
- purchases
### Nome das colunas
- id 
- buyer
- total_price
- created_at

## Tabela de Registro de Produtos Comprados 🧾🧾
### Nome da Tabela:
purchases_products
### Nome das colunas
- purchase_id
- product_id
- quantity
--------------------------
<br>

#### Para realizar a modelagem do seu banco de dados e das tabelas, considere a imagem a baixo. 

Nela são mostradas as relações entre as tabelas :

![image](https://github.com/labenuexercicios/projeto-labecommerce/assets/29845719/b446bbb0-bc9c-42d9-be04-b9ce1d605bd4)
https://dbdiagram.io/d/63c6e8e5296d97641d7a4666

<br>
---------------

## Caminhos das Requisições (Paths) 🛣🛣
Os caminhos devem ser definidos em letras minúsculas, sem acento e sem caracteres especiais. Siga conforme o modelo de documentação proposto.

### Requisições de Usuários
- /users
### Requisições de Produtos
- /products
### Requisições de Compras
- /purchases
---------------
# Lista de requisitos - Obrigatórios

### 1. Estruturar os dados como planejado
O banco de dados deve possuir as tabelas e colunas conforme o diagrama.
- é um simulado de requerimentos em um projeto real e erros de implementação nesse nível deixarão o projeto inválido.

As requisições também devem respeitar o que é esperado, você pode confirmar as estruturas vendo os exemplos de cada endpoint.
- garanta que tanto o body, quanto a resposta e seu status estejam de acordo com o que foi planejado

### 2. Implementar os Endpoints :

    - [ ]  Get all users
    - [ ]  Create user
    - [ ]  Create product
    - [ ]  Get all products funcionalidades 1 e 2
    - [ ]  Edit product by id
    - [ ]  Create purchase
    - [ ]  Delete purchase by id
    - [ ]  Get purchase by id

### 3. Documentação no Postman de todos os endpoints (obrigatória para correção), descrevendo os endpoints e colocando os exemplos de respostas 

### 4. Criar o arquivo  README.md , explicando seu projeto com prints das respostas

Aqui está uma Documentação para referência (como deve ficar)
https://documenter.getpostman.com/view/21151478/2s8ZDeSdbz

-------------------

# Exemplos de requisição

**Não precisa cadastrar o mesmo nome, email e quaisquer outros valores vistos aqui nos exemplos de saída. Porém, deve-se respeitar rigorosamente a estrutura pedida no banco de dados (nome das tabelas e colunas), nomes das propriedades do corpo e da resposta da API, além do caminho dos endpoints**

-------------------

## Get all users
Retorna todas as pessoas cadastradas.<br>
Dica: atenção com o nome da propriedade createdAt! Ela deve vir em camelCase, apesar de estar em snake_case no banco de dados.
```typescript
// Request
// GET /users

// Response
// status 200 OK
[
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: "2023-01-15 09:12:42"
    },
    {
        id: "u002",
        name: "Ciclana",
        email: "ciclana@email.com",
        password: "ciclana99",
        createdAt: "2023-01-17 12:35:28"
    }
]
```

<br>

-------------------------
## Create user
Cadastra uma nova pessoa.
```typescript
// Request
// POST /users
// body JSON
{
    "id": "u003",
    "name": "Astrodev",
    "email": "astrodev@email.com",
    "password": "astrodev00"
}

// Response
// status 201 CREATED
{
    message: "Cadastro realizado com sucesso"
}
```
---------------
<br>

## Create product
Cadastra um novo produto.
```typescript
// Request
// POST /products
// body JSON
{
    "id": "prod003",
    "name": "Teclado gamer",
    "price": 200,
    "description": "Teclado mecânico com numpad",
    "imageUrl": "https://picsum.photos/seed/Teclado%20gamer/400"
}

// Response
// status 201 CREATED
{
    message: "Produto cadastrado com sucesso"
}
```

---------------------
<br>

## Get all products funcionalidade 1
Retorna todos os produtos cadastrados.
```typescript
// Request
// GET /products

// Response
// status 200 OK
[
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    },
    {
        id: "prod003",
        name: "Teclado gamer",
        price: 200,
        description: "Teclado mecânico com numpad",
        imageUrl: "https://picsum.photos/seed/Teclado%20gamer/400"
    }
]
```

---------------------------
<br>

## Get all products funcionalidade 2
Caso seja enviada uma query params (name) deve ser retornado o resultado da busca de produtos que contenham o _"name"_ informado em seu nome.
```typescript
// Request
// query params = name
// GET /products?name=gamer

// Response
// status 200 OK
[
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "prod003",
        name: "Teclado gamer",
        price: 200,
        description: "Teclado mecânico com numpad",
        imageUrl: "https://picsum.photos/seed/Teclado%20gamer/400"
    }
]
```

---------------------------
<br>

## Edit product by id
Edita um produto existente.
```typescript
// Request
// path params = :id

// PUT /products/prod003
// body JSON
{
    "id": "prod0033",
    "name": "Teclado gamer RGB",
    "price": 300,
    "description": "Teclado mecânico com RGB e numpad",
    "imageUrl": "https://picsum.photos/seed/Teclado%20gamer%20RGB/400"
}

// Response
// status 200 OK
{
    message: "Produto atualizado com sucesso"
}
```

---------------------------
<br>

## Create purchase
Cadastra um novo pedido. Como dica, o exercício 1 da aula de [Relações em SQL II](https://github.com/labenuexercicios/relacoes-sql-II-exercicios) é uma boa referência.
```typescript
// Request
// POST /purchases
// body JSON
{
    "id": "pur001",
    "buyer": "u001",
    "products": [
        {
            "id": "prod001",
            "quantity": 2
        },
        {
            "id": "prod002",
            "quantity": 1
        }
    ]
}

// Response
// status 201 CREATED
{
    message: "Pedido realizado com sucesso"
}
```


---------------------------
<br>

## Delete purchase by id
Deleta um pedido existente.
```typescript
// Request
// path params = :id
// DELETE /purchases/pur002

// Response
// status 200 OK
{
    message: "Pedido cancelado com sucesso"
}
```


---------------------------
<br>

## Get purchase by id
Retorna os dados de uma compra, incluindo a lista de produtos da mesma.
```typescript
// Request
// path params = :id
// GET /purchases/pur001

// Response
// status 200 OK
{
    purchaseId: "pur001",
    buyerId: "u001",
    buyerName: "Fulano",
    buyerEmail: "fulano@email.com",
    totalPrice: 1400,
    createdAt: "2023-01-15 16:24:54",
    products: [
        {
            id: "prod001",
            name: "Mouse gamer",
            price: 250,
            description: "Melhor mouse do mercado!",
            imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
            quantity: 2
        },
        {
            id: "prod002",
            name: "Monitor",
            price: 900,
            description: "Monitor LED Full HD 24 polegadas",
            imageUrl: "https://picsum.photos/seed/Monitor/400",
            quantity: 1
        }
    ]
}
```


---------------------------
<br>