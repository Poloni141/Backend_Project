import fs from 'fs';
import ProductManager from './productManager.js';

const productManager = new ProductManager('products.json');
const { getProductById } = productManager;

class CartsManager {
  constructor(file) {
    this.file = file;
  }

  getCarts = () => {
    if (fs.existsSync(this.file)) {
      const carts = JSON.parse(fs.readFileSync(this.file, 'utf-8'));
      return carts;
    } else {
      fs.writeFileSync(this.file, 'utf-8');
      const carts = [];
      return carts;
    }
  };

  getCartProducts = (id) => {
    const selectedCart = this.getCartById(id);
    if (selectedCart) {
      return selectedCart.products;
    } else {
      console.log('ID not found');
      return;
    }
  };

  addCart = () => {
    const allCarts = this.getCarts();

    const cart = {
      id: 0,
      products: [],
    };

    allCarts.length === 0
      ? cart.id++
      : (cart.id = allCarts[allCarts.length - 1].id + 1);

    allCarts.push(cart);
    fs.writeFileSync(this.file, JSON.stringify(allCarts), 'utf-8');
    console.log('Carrito creado');
  };

  getCartById = (id) => {
    const allCarts = this.getCarts();
    const searchCart = allCarts.find((cid) => cid.id === id);
    if (searchCart) {
      return searchCart;
    } else {
      console.log('ID not found');
    }
  };

  addProductToCart = (cid, pid) => {
    const allCarts = this.getCarts();
    const selectedCart = this.getCartById(cid);
    const selectedProd = productManager.getProductById(pid);
    if (!selectedCart || !selectedProd) {
      console.log('Error: Carrito o producto no encontrado.');
      return;
    }

    const productExist = selectedCart.products.find((prod) => prod.id === pid);
    if (productExist) {
      productExist.quantity += 1;
      console.log('Producto agregado');
    } else {
      selectedCart.products.push({ id: pid, quantity: 1 });
      console.log('Producto agregado');
    }

    const updatedCarts = allCarts.map((cart) => {
      if (cart.id === selectedCart.id) {
        return selectedCart;
      } else {
        return cart;
      }
    });

    fs.writeFileSync(this.file, JSON.stringify(updatedCarts), 'utf-8');
  };
}

// const store = new CartsManager('./carts.json');
// store.getCartProducts(1);
// store.addCart();
// store.getCartById(3);

export default CartsManager;
