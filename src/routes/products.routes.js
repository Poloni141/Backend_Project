import { Router } from 'express';
import ProductManager from '../productManager.js';

const productManager = new ProductManager('products.json');
const { getProducts, getProductById, addProduct, updateProduct } =
  productManager;

const productsRouter = Router();

productsRouter.get('/', (req, res) => {
  const maxlimitFilter = Number.parseInt(req.query.limit);
  if (!maxlimitFilter) {
    res.send(getProducts());
    return;
  }

  res.send(getProducts().slice(0, maxlimitFilter));
});

productsRouter.get('/:prodID', (req, res) => {
  let prodID = Number.parseInt(req.params.prodID);
  res.send(getProductById(prodID));
});

productsRouter.post('/new', (req, res) => {
  const { title, description, price, thumbnail, stock } = req.body;
  productManager.addProduct(title, description, price, thumbnail, stock);
  res.status(201).send(req.body);
});

productsRouter.put('/', async (req, res) => {
  const { id, key, value } = req.body;
  productManager.updateProduct(id, key, value);
  res.status(200).send(req.body);
});

export default productsRouter;
