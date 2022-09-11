import * as mongoose from 'mongoose';
export default interface IVersionableModel extends mongoose.Document {
    createdAt: Date;
    originalId: string;
    deletedAt: Date;
}
