import * as express from 'express';
import UserController from './controller';
const stockRouter = express.Router();

stockRouter.route('/')
// .get( UserController.get)
.post(UserController.create )


stockRouter.route('/currentPrice')
.get(UserController.currentPrice);

stockRouter.route('/gainerLosser')
.get(UserController.topNGainerLooser );

stockRouter.route('/details/:id')
.get(UserController.getDetails );

stockRouter.route('/stockList')
.post(UserController.getStockList );

export default stockRouter;
