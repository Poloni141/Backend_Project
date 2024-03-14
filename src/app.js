import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();
app.use(express.urlencoded({ extended: true })); //Incrementa el dinamismo de las URL's para que reciba datos complejos
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world :D');
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => console.log('Server ON'));
