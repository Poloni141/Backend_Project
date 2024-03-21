import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import realTimeRouter from './routes/realTimeProducts.routes.js';
import homeRouter from './routes/home.routes.js';
import __dirname from './utils.js';

const app = express();
// Config handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views/layouts`);
app.set('view engine', 'handlebars');

// Seteo la carpeta public
app.use(express.static(`${__dirname}/../public`));

app.use(express.urlencoded({ extended: true })); //Incrementa el dinamismo de las URL's para que reciba datos complejos
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world :D');
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', homeRouter);
app.use('/', realTimeRouter);

const httpServer = app.listen(8080, () => console.log('Server ON'));

// Creo el servidor de WebSockets
const socketServer = new Server(httpServer);
// Cuando alguien se conecta -> Sucede el evento debajo
socketServer.on('connection', (user) => {
  console.log(`Usuario conectado: ${user.id}`);

  socket.emit('arrayProd', history);

  socket.on('newProduct', (data) => {
    const { title, description, price, thumbnail, stock } = data;
    productManager.addProduct(title, description, price, thumbnail, stock);
    history = productManager.getProducts();
    socket.emit('arrayProd', history);
  });

  socket.on('delProduct', (data) => {
    const { id } = data;
    productManager.deleteProduct(id);
    history = productManager.getProducts();
    socket.emit('arrayProd', history);
  });
});
