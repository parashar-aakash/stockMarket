import * as mongoose from 'mongoose';

import IStockModel from './IStockModel';
import StockSchema from './StockSchema';

export const stockSchema = new StockSchema({
    collection: 'stock',
});

export const stockModel: mongoose.Model<IStockModel> = mongoose.model<IStockModel>
    (
        'Stock',
        stockSchema,
        'Stock',
        true,
    );
