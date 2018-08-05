import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const IssueSchema = new Schema({
    id: {
        type: Number,
        required: 'Please provide an issue ID'
    },
    title: {
        type: String,
    },
    priority: {
        type: String
    },
    status: {
        type: String
    },
    description: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
