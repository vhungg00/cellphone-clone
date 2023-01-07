import mongoose from 'mongoose'

const Schema = mongoose.Schema
const MessageSchema = new Schema({
    idConversation: {
        type: Schema.Types.ObjectId,
        ref: 'conversation',
    },
    sender: {
        type: String,
        ref: 'user',
    },
    message: {
        type: String,
    },
    createAt: {
        type: Number,
        default: Date.now
    },
}, {
    timestamps: true
});

export const MessageModel = mongoose.model('message', MessageSchema)
