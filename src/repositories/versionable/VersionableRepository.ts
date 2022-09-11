import * as mongoose from 'mongoose';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    private model: M;

    constructor(model) {
        this.model = model;
    }

    public static generateObjectId(): string {
        return String(mongoose.Types.ObjectId());
    }

    public async count() {
        return await this.model.countDocuments();
    }

    public async findOne(query: object) {
        return await this.model.findOne(query).lean();
    }

    public async create(data: any): Promise<D> {
        const id = VersionableRepository.generateObjectId();
        const { price, name } = data;
        const dbData: any = await this.model.find({ name: name })
        let modelData;
        if(dbData.length === 0){
            modelData = {
                openPrice: data.price,
                low: data.price,
                high: data.price,
                name: data.name,
                originalId: id,
                _id: id,
            };
            return await this.model.create(modelData);
        }
        else{
            let LOW=0;
            let HIGH=0;
            const { low, high } = dbData[0];
            price < low?LOW= price:LOW= low;
            price > high?HIGH= price:HIGH= high;
            const { openPrice } = dbData[0];
            let percentageDifference= (price - openPrice)/100;
            modelData = {
                currentPrice: price,
                low: LOW,
                high: HIGH,
                percentageDifference  
            }
            return await this.model.findOneAndUpdate({name: data.name}, modelData);
        }
    }

    public async getCurrentPrice(data: any) {
        return await this.model.findOne({ originalId: data }, { currentPrice: 1, percentageDifference: 1,_id: 0 });
    }
    public async topNGainerLooser(number: any) {
        const topGains = await this.model.find({}, {name: 1, percentageDifference: 1, _id: 0}).sort({percentageDifference: -1}).limit(number.number);
        const topLosses = await this.model.find({}, {name: 1, percentageDifference: 1, _id: 0}).sort({percentageDifference: 1}).limit(number.number);
        return { topGains, topLosses };
    }
    
    public async getStockList(number: any) {
        let finalArray: any= [];
        for( let id of number){
            const result = await this.model.findOne({originalId: id}, {originalId: 1, name: 1, currentPrice: 1, openPrice: 1, high: 1, low: 1, _id: 0});
            finalArray= [...finalArray, result];
        };
        return finalArray;
    }

}
