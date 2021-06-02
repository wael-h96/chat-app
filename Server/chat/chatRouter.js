const express = require('express')
const router = express.Router()
const chatDB = require('./chatSchema')
const userDB = require('../users/userSchema')
const ws = require('../webSocket')

router.post('/', async (req, res) => {
    const { newMessage, user1, user2 } = req.body

    try {
        const findCommonChat = await getUsersCommonChat(user1, user2)

        if (findCommonChat.length != 0) {//if there is already a chat between the two users
            await chatDB.updateOne({ chatId: findCommonChat[0] }, { $push: { messages: newMessage } })

        } else {//in case that there is no prev chat
            const chatDBResponse = await chatDB.insertMany({ user1, user2 })
            const chatId = chatDBResponse[0]._id
            await chatDB.updateOne({ user1, user2 }, { $push: { messages: newMessage }, chatId: chatId })
            await userDB.updateOne({ email: user1 }, { $push: { chatId } })
            await userDB.updateOne({ email: user2 }, { $push: { chatId } })
        }
        res.json(newMessage)
        ws.notifyUser("message-sent")

    } catch (error) {
        console.log(error)
    }
})

router.get('/get-chat/:user1/:user2', async (req, res) => {
    console.log("got here")
    const user1 = req.params.user1
    const user2 = req.params.user2
    console.log(user1, user2)
    try {
        const findCommonChat = await getUsersCommonChat(user1, user2)
        console.log(findCommonChat)
        if (findCommonChat.length !== 0) {
            const chat = await chatDB.find({ chatId: findCommonChat[0] })
            res.json(chat[0].messages)
        } else {
            res.json([])
        }

    } catch (error) {
        console.log(error)
    }
})

const getUsersCommonChat = async (user1, user2) => {

    try {

        const checkChatsForUser1 = await userDB.find({ email: user1 })
        const user1ChatsId = checkChatsForUser1[0].chatId
        const checkChatsForUser2 = await userDB.find({ email: user2 })
        const user2ChatsId = checkChatsForUser2[0].chatId
        const common = user1ChatsId.filter(chatId => user2ChatsId.indexOf(chatId) !== -1)
        return common
    } catch (error) {
        console.log(error)

    }
}




module.exports = router