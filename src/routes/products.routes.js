import { Router } from 'express';
import ProductManager from '../productManager.js';

const productManager = new ProductManager('products.json');
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = productManager;

const productsRouter = Router();

productsRouter.get('/', (req, res) => {
  const maxlimitFilter = Number.parseInt(req.query.limit);
  if (!maxlimitFilter) {
    res.status(200).send(getProducts());
    return;
  }

  res.status(200).send(getProducts().slice(0, maxlimitFilter));
});

productsRouter.get('/:prodID', (req, res) => {
  let prodID = Number.parseInt(req.params.prodID);
  res.status(200).send(getProductById(prodID));
});

productsRouter.post('/new', (req, res) => {
  const { title, description, price, thumbnail, stock } = req.body;
  productManager.addProduct(title, description, price, thumbnail, stock);
  res.status(201).send(req.body);
});

productsRouter.put('/:prodID', (req, res) => {
  let prodID = Number.parseInt(req.params.prodID);
  const { key, value } = req.body;
  if (key === 'id') {
    res.status(400).send('No podes cambiar el ID');
    return;
  }

  productManager.updateProduct(prodID, key, value);
  res.status(202).send(req.body);
});

productsRouter.delete('/:prodID', (req, res) => {
  try {
    let prodID = Number.parseInt(req.params.prodID);
    productManager.deleteProduct(prodID);
    res.status(410).send('Producto eliminado');
  } catch (error) {
    console.log(error);
    res.status(400).send('No se pudo resolver la solicitud.');
  }
});

export default productsRouter;
