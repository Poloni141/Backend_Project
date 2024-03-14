import { Router } from 'express';
import CartsManager from '../cartsManager.js';

const cartsManager = new CartsManager('carts.json');

const { addCart, getCarts, getCartById, addProductToCart, getCartProducts } =
  cartsManager;

const cartsRouter = Router();

cartsRouter.get('/:cartID', (req, res) => {
  const cartID = Number.parseInt(req.params.cartID);
  res.status(200).send(getCartProducts(cartID));
});

cartsRouter.post('/', (_, res) => {
  try {
    cartsManager.addCart();
    res.status(202).send('Carrito creado');
  } catch (error) {
    res.status(400).send('Error al crear al carrito: ' + error);
  }
});

cartsRouter.post('/:cartID/product/:prodID', (req, res) => {
  try {
    const cartID = Number.parseInt(req.params.cartID);
    const prodID = Number.parseInt(req.params.prodID);
    cartsManager.addProductToCart(cartID, prodID);
    res.status(201).send('Producto agregado');
  } catch (error) {
    res.status(400).send('No se pudo agregar tu producto');
  }
});

export default cartsRouter;
