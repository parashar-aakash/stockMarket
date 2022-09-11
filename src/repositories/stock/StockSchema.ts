import versionableSchema from '../versionable/VersionableSchema';

class UserSchema extends versionableSchema {

    constructor(collection) {
        const baseSchema = Object.assign({
            _id: String,
            name: String,
            openPrice: Number,
            currentPrice: Number,
            high: Number,
            low: Number,
            percentageDifference: Number,
        });
        super(baseSchema, collection);
    }
}

export default UserSchema;
