import { Router } from 'express';
import ProductManager from '../productManager.js';

const productManager = new ProductManager('products.json');
const { getProducts } = productManager;
const homeRouter = Router();

homeRouter.get('/home', async (_, res) => {
  let products = await productManager.getProducts();

  res.render('home', {
    products,
  });
});

export default homeRouter;
