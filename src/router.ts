import { stockRouter } from './controllers/stock';
import { Router } from 'express';

const mainRouter = Router();

mainRouter.use( '/stock' , stockRouter );

export default mainRouter;
