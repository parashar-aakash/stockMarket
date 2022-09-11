import * as mongoose from 'mongoose';
import IStockModel from './IStockModel';
import { stockModel } from './StockModel';
import { hashSync } from 'bcryptjs';
import VersionableRepository from '../versionable/VersionableRepository';

export default class StockRepository extends VersionableRepository<IStockModel, mongoose.Model<IStockModel>> {

    constructor() {
        super(stockModel);
    }

    public createStock(data) {
        return super.create(data);
    }

    public getDetails(id) {
        return super.findOne(id);
    }

    public topNGainerLooser(number) {
        return super.topNGainerLooser(number);
    }

    public findone(data) {
        return super.findOne(data);
    }
   
    public getStockList(data) {
        return super.getStockList(data);
    }
}
