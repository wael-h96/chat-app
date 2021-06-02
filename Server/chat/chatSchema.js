const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        chatId:String,
        user1:String,
        user2:String,
        messages: {
            type: Array,
        }
    },
    {
        collection: 'chat',
        versionKey: false,
    }
)

const chat = mongoose.model("chat", chatSchema)

module.exports = chat;