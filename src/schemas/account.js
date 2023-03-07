import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});

export default mongoose.model('accounts', accountSchema);