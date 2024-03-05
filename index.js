// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo implementa uma API RESTful baseada no JSONServer
// O servidor JSONServer fica hospedado na seguinte URL
// https://jsonserver.rommelpuc.repl.co/contatos
//
// Para montar um servidor para o seu projeto, acesse o projeto 
// do JSONServer no Replit, faça o FORK do projeto e altere o 
// arquivo db.json para incluir os dados do seu projeto.
//
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
//
// Autor: Rommel Vieira Carneiro
// Data: 03/10/2023


const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db/db.json');
const cors = require('cors');

const express = require('express');
const apicache = require('apicache');
const app = express();

const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);

// Defina os dados dos produtos
const produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" }
    ]
};

//const cache = apicache.middleware('5 minutes');
let cacheLastModified = produtos.lastModified;

app.use(express.json());

// GET ALL
app.get('/produtos', (req, res) => {
  if (cacheLastModified == produtos.lastModified) {
      res.status(304).end(); // Retorna 304 se os dados não foram modificados
  } else {
      cacheLastModified = produtos.lastModified; // Atualiza o cacheLastModified
      res.status(200).json(produtos);
  }
});


// GET id
app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const produto = produtos.produtos.find(p => p.id == parseInt(id));
  if (produto) {
      if (cacheLastModified == produtos.lastModified) {
          res.status(304).end(); // Retorna 304 se os dados não foram modificados
      } else {
          res.status(200).json(produto);
      }
  } else {
      res.status(404).send({ message: "Produto não encontrado" });
  }
});

const updateLastModified = () => {
  produtos.lastModified = Date.now();
};

// POST
app.post('/produtos', (req, res) => {  
    updateLastModified();  
    
    const { descricao, valor, marca } = req.body;

    const novoProduto = {
      id: produtos.produtos.length > 0 ? Math.max(...produtos.produtos.map(p => p.id)) + 1 : 1,
      descricao,
      valor,
      marca
    };
  
    produtos.produtos.push(novoProduto);
    res.status(201).json(novoProduto);
  });

// PUT
app.put('/produtos/:id', (req, res) => {
  updateLastModified();  

  const { id } = req.params;

  const indice = produtos.produtos.findIndex(p => p.id == id);

  if (indice >= 0) {
    produtos.produtos[indice] = { 
      ...produtos.produtos[indice],
      ...req.body 
    };    
    res.json(produtos.produtos[indice]);
  } else {    
    res.status(404).send({ message: "Produto não encontrado" });
  }
});


// DELETE
app.delete('/produtos/:id', (req, res) => {
  updateLastModified();    
  const { id } = req.params;
  const index = produtos.produtos.findIndex(p => p.id == id);

  if (index > -1) { 
    produtos.produtos.splice(index, 1); 
    res.send({ message: "Produto removido com sucesso" }); 
  } else {
    res.status(404).send({ message: "Produto não encontrado" }); 
  }
});
  
  

app.use('/api', router);

app.listen(3000, () => {
  console.log('JSONserver is running')
});