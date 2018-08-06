import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ProjectSchema = new Schema({

    name: {
        type: String,
    },
    owner: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now
    },

});


mongoose.model('Project', ProjectSchema);
export default mongoose.model('Project');
