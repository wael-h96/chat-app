const express = require('express')
const router = express.Router()
const chatDB = require('./chatSchema')
const userDB = require('../users/userSchema')
const ws = require('../webSocket')
const { client } = require('../server')

router.post('/', async (req, res) => {
    const { newMessage, user1, user2 } = req.body

    try {
        const findCommonChat = await getUsersCommonChat(user1, user2)

        if (findCommonChat.length != 0) {//if there is already a chat between the two users
            await chatDB.updateOne({ chatId: findCommonChat[0] }, { $push: { messages: newMessage } })
            const chat = await chatDB.find({ chatId: findCommonChat[0] })
            client.setex(JSON.stringify(findCommonChat[0]), 60, JSON.stringify(chat[0].messages))
            
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

    const user1 = req.params.user1
    const user2 = req.params.user2

    try {
        const findCommonChat = await getUsersCommonChat(user1, user2)

        if (findCommonChat.length !== 0) {//There is a prev chat

            client.get(JSON.stringify(findCommonChat[0]), async (err, prevChat) => {

                if (prevChat) {
                    res.send(JSON.parse(prevChat))
                    console.log(prevChat)

                } else {
                    const chat = await chatDB.find({ chatId: findCommonChat[0] })
                    client.setex(JSON.stringify(findCommonChat[0]), 60, JSON.stringify(chat[0].messages))
                    res.json(chat[0].messages)
                }
            })

        } else {//No prev chat so empty array is returned
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