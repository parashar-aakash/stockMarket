import * as mongoose from 'mongoose';

export default interface IStockModel extends mongoose.Document {
    name: string;
    openPrice: number;
    currentPrice: number;
    high: number;
    low: number;
    percentageDifference: number;
}
