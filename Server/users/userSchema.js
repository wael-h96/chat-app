const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: String,
        chatId: {
            type: Array,
        },
        online: Boolean,
        blockedUsers: {
            type: Array,
        }
    },
    {
        collection: 'user',
        versionKey: false,
    }
)

const user = mongoose.model("user", userSchema)

module.exports = user;