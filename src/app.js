import express from 'express';
import productsRouter from './routes/products.routes.js';

const app = express();
app.use(express.urlencoded({ extended: true })); //Incrementa el dinamismo de las URL's para que reciba datos complejos
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world :D');
});

app.use('/api/products', productsRouter);

app.listen(8080, () => console.log('Server ON'));
