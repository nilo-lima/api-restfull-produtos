
# Documentação da API de Produtos

Esta API permite gerenciar uma lista de produtos, incluindo operações para listar, adicionar, atualizar e deletar produtos.

## Base URL

A URL base para todas as chamadas API é:

```
http://localhost:3000
```

---

## Endpoints

### Listar Todos os Produtos

- **GET** `/produtos`
- Retorna todos os produtos.
- Exemplo de chamada:
  ```
  curl -X GET http://localhost:3000/produtos
  ```

### Obter Detalhes de um Produto

- **GET** `/produtos/:id`
- Retorna detalhes de um único produto.
- Exemplo de chamada:
  ```
  curl -X GET http://localhost:3000/produtos/1
  ```

### Adicionar um Novo Produto

- **POST** `/produtos`
- Adiciona um novo produto à lista.
- Exemplo de corpo da requisição:
  ```json
  {
    "descricao": "Café Moído 500gr",
    "valor": 9.50,
    "marca": "Café do Ponto"
  }
  ```
- Exemplo de chamada:
  ```
  curl -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d '{"descricao":"Café Moído 500gr", "valor":9.50, "marca":"Café do Ponto"}'
  ```

### Atualizar um Produto

- **PUT** `/produtos/:id`
- Atualiza informações de um produto existente.
- Exemplo de corpo da requisição para atualizar o produto com ID 2:
  ```json
  {
    "descricao": "Maionese 500gr",
    "valor": 8.00,
    "marca": "Helmans"
  }
  ```
- Exemplo de chamada:
  ```
  curl -X PUT http://localhost:3000/produtos/2 -H "Content-Type: application/json" -d '{"descricao":"Maionese 500gr", "valor":8.00, "marca":"Helmans"}'
  ```

### Deletar um Produto

- **DELETE** `/produtos/:id`
- Remove um produto da lista.
- Exemplo de chamada para remover o produto com ID 3:
  ```
  curl -X DELETE http://localhost:3000/produtos/3
  ```

---

## Códigos de Status

- **200 OK**: A solicitação foi bem-sucedida (alguns métodos GET e PUT).
- **201 Created**: Um recurso foi criado com sucesso (POST).
- **304 Not Modified**: O recurso solicitado não foi modificado desde a última solicitação.
- **404 Not Found**: O recurso solicitado não foi encontrado (ID inválido ou inexistente).
- **500 Internal Server Error**: Erro genérico do servidor.

---

Essa documentação fornece uma visão geral básica de como interagir com a API de produtos. Note que, para testar as requisições `curl` em um ambiente real, você precisa ter a API rodando localmente na porta 3000.
