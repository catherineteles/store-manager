const express = require('express');

const bodyParser = require('body-parser');

const productController = require('./controllers/productControllers');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAll);

app.get('/products/:id', productController.getById);

app.post('/products', productController.create);

app.use((err, _req, res, _next) => {
  const { message } = err;
  switch (message) {
    case message.includes('required'): res.status(400).json({ message }); break;
    case message.includes('must'): res.status(422).json({ message }); break;
    case message.includes('found'): res.status(404).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;