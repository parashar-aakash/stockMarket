const cron = require("node-cron");
import StockController from '../controllers/stock/controller';

export const generateStockDataCron = async () => {
    cron.schedule('* * * * *', () => {
        console.log('creating data every minute');
        generateDataAndPostToDb();
      });
};

export async function generateDataAndPostToDb() {
    let list = [];
    for(let i= 0; i< 100; i++){
        list[`Stock${i}`] = Math.random();
        StockController.create({name: `Stock${i}`, price: Math.random()});
    }
    console.log(list);
};