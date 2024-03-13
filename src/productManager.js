import fs from 'fs';

class ProductManager {
  constructor(file) {
    this.file = file;
  }

  validateFields(title, description, price, thumbnail, stock) {
    if (!title || !description || !price || !thumbnail || !stock) {
      return false;
    }
    return true;
  }

  addProduct(title, description, price, thumbnail, stock) {
    const products = this.getProducts();

    if (this.validateFields(title, description, price, thumbnail, stock)) {
      const product = {
        title,
        description,
        price,
        thumbnail,
        stock,
        status: true,
        id: 0,
      };

      products.length === 0
        ? product.id++
        : (product.id = products[products.length - 1].id + 1);

      products.push(product);
      fs.writeFileSync(this.file, JSON.stringify(products), 'utf-8');
      console.log('Producto agregado!');
    } else {
      console.log('Completar todos los campos para poder agregar un producto');
    }
  }

  getProducts = () => {
    if (fs.existsSync(this.file)) {
      const products = JSON.parse(fs.readFileSync(this.file, 'utf-8'));
      // console.log(products);
      return products;
    } else {
      fs.writeFileSync(this.file, '[]', 'utf-8');
      const products = [];
      return products;
    }
  };

  getProductById = (id) => {
    const products = this.getProducts();
    let searchProd = products.find((p) => p.id === id);
    if (searchProd) {
      return searchProd;
    } else {
      console.log('ID not found');
    }
  };

  updateProduct = (id, key, value) => {
    let products = this.getProducts();
    let objIndex = products.findIndex((obj) => obj.id === id);
    if (objIndex !== -1) {
      products[objIndex][key] = value;
      fs.writeFileSync(this.file, JSON.stringify(products), 'utf-8');
    } else {
      console.log('ID invalido.');
    }
  };

  deleteProduct = (id) => {
    let products = this.getProducts();
    let deleteObj = products.findIndex((obj) => obj.id === id);
    if (deleteObj > -1) {
      products.splice(deleteObj, 1);
    }

    return (products = fs.writeFileSync(
      this.file,
      JSON.stringify(products),
      'utf-8'
    ));
  };
}

export default ProductManager;

// const store = new ProductManager('./products.json');

// store.updateProduct(1, 'title', 'Otro titulo');
// store.deleteProduct(2);
