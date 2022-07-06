const express = require('express');
require('express-async-errors');

const bodyParser = require('body-parser');

const productController = require('./controllers/productControllers');
const salesController = require('./controllers/salesControllers');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAll);

app.get('/products/:id', productController.getById);

app.post('/products', productController.create);

app.post('/sales', salesController.create);

app.get('/sales', salesController.getList);

app.get('/sales/:id', salesController.getById);

app.use((err, _req, res, _next) => {
  const { message, name, code } = err;
  switch (name) {
    case 'ValidationError': res.status(code).json({ message }); break;
    case 'Error': res.status(404).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;