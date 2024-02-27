import express from 'express';
import ProductManager from './productManager.js';

const productManager = new ProductManager('products.json');
const { getProducts, getProductById } = productManager;

const app = express();
app.use(express.urlencoded({ extended: true })); //Incrementa el dinamismo de las URL's para que reciba datos complejos

app.get('/', (req, res) => {
  res.send('Hello world :D');
});

app.get('/products', (req, res) => {
  const maxlimitFilter = Number.parseInt(req.query.limit);
  if (!maxlimitFilter) {
    res.send(getProducts());
  }

  res.send(getProducts().slice(0, maxlimitFilter));
});

app.get('/products/:prodID', (req, res) => {
  let prodID = Number.parseInt(req.params.prodID);
  res.send(getProductById(prodID));
});

app.listen(8080, () => console.log('Server ON'));
