import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { hashSync, compare } from 'bcrypt';
import { config } from '../../config';
import IRequest from '../../IRequest';
import StockRepository from '../../repositories/stock/StockRepository';

class StockController {

    public async currentPrice(req: IRequest, res: Response, next: NextFunction) {
        const id = req.query;
        const stock = new StockRepository();

        await stock.getCurrentPrice( id.id )
            .then((data) => {
                const { percentageDifference, currentPrice } = data;
                let value;
                (percentageDifference> 0)?value= 'High':value= 'Low'
                res.status(200).send({
                    status: 200,
                    message: `CurrentPrice Fetched successfully`,
                    currentPrice,
                    percentageDifference: percentageDifference,
                    Result: value,
                });
            })
            .catch((err) => {
                res.send({
                    status: 404,
                    message: 'Could not fetch currentPrice',
                    error: err
                });
            });
    }
    
    public async getDetails(req: IRequest, res: Response, next: NextFunction) {
        let id = req.params;
        const stock = new StockRepository();
        const { id: stockId } = id;
        // id = JSON.parse(stockId);
        await stock.getDetails( {originalId: stockId })
            .then((data) => {
                const { openPrice, currentPrice, low, high } = data;
                res.send({
                    status: 200,
                    message: `Stock Details Fetched successfully`,
                    openPrice, currentPrice, low, high,
                });
            })
            .catch((err) => {
                res.send({
                    status: 404,
                    message: 'Could not fetch Stock Details',
                    error: err
                });
            });
    }

    public async create(req, res: Response, next: NextFunction) {
        const stock = new StockRepository();
        const {name, price} = req;
        stock.createStock({ name, price })
            .then(() => {
               console.log('Saved To DB'); 
            });
    }
   
    public async getStockList(req, res: Response, next: NextFunction) {
        const stock = new StockRepository();
        stock.getStockList(req.body)
            .then((data) => {
               res.send({
                status: 200,
                message: 'Data retrieved successfully',
                data
               }) 
            })
            .catch((err) => {
                res.send({
                    status: 404,
                    message: 'Could not retrieve data',
                    error: err
                });
            });
    }

    public async topNGainerLooser(req: IRequest, res: Response, next: NextFunction) {
        let { number= 1 } = req.query;
        const stock = new StockRepository();
        number= JSON.parse(number);
        await stock.topNGainerLooser({ number })
            .then((userData) => {
                const { topGains, topLosses } = userData;
                res.send({
                    status: 200,
                    message: 'Successfully fetched top N Gains and Losses',
                    topGains,
                    topLosses,
                })
            })
            .catch((err) => {
                res.send({
                    status: 404,
                    message: 'Could not fetch top N gains and losses',
                    error: err
                });
            });
    }

}

export default new StockController();
