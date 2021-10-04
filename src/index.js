//importa os módulos http e express
const http = require("http");
const express = require("express");
//constrói um objeto express
const app = express();
//importa o body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//configura a porta do servidor e o coloca em execução.
const porta = 3000;
app.set("port", porta);
const server = http.createServer(app);
server.listen(3000);

let id = 1;
let produto = [
  {
    id: 1,
    nome: "salgado",
    unidade: "1",
    valor: "10",
  },
  {
    id: 2,
    nome: "suco",
    unidade: "10",
    valor: "5",
  },
];
//tratamento de requisições POST
app.post("/produto", (req, res, next) => {
  const produto = {
    id: (id += 1),
    nome: req.body.nome,
    unidade: req.body.unidade,
    valor: req.body.valor,
  };
  produto.push(produto);
  res.status(201).json(produto);
});
//tratamento de requisições GET
app.get("/produto", (req, res, next) => {
  res.status(200).json(produto);
});
//tratamento de requisições PUT
app.put("/produto", (req, res, next) => {
  produto.forEach((produto) => {
    if (produto.id === req.body.id) {
      produto.unidade = req.body.unidade;
    }
  });
  res.status(204).end();
});
app.delete("/produto/:id", (req, res) => {
  //Apagar o registro no banco de dados MongoDB
  const produto = produto.deleteOne({ _id: req.params.id }, (err) => {
    //Retornar erro quando não conseguir apagar no banco de dados
    if (err)
      return res.status(400).json({
        error: true,
        message: "Error: Produto não foi apagado com sucesso!",
      });

    //Retornar mensagem de sucesso quando excluir o registro com sucesso no banco de dados
    return res.json({
      error: false,
      message: "Produto apagado com sucesso!",
    });
  });
});
