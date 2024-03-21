import { Router } from 'express';

const realTimeRouter = Router();

realTimeRouter.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

export default realTimeRouter;
