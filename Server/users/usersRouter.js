const express = require('express')
const router = express.Router()
const userDB = require('./userSchema')
const wsHandler = require("../webSocket")
const client = require('../server')


router.get('/', async (req, res) => {//fetches all the users
    try {
        
        // Redis 
        // client.get("users", async (err, users) => {
        //     if (users) {
        //         res.send(users)
        //     } else {
        //         console.log("got here")
        //     }
        // })

        const allUsers = await userDB.find()
        res.send(allUsers)

    } catch (error) {

    }
})


router.post('/login', async (req, res) => {

    const { email } = req.body

    try {
        const ifUserAlreadyExists = await userDB.find({ email })
        if (ifUserAlreadyExists.length === 0) {//means that the user not exists

            const dbResponse = await userDB.insertMany([{ email, online: true }])
        } else {

            await userDB.updateOne({ email }, { $set: { online: true } })
        }

        const user = await userDB.find({ email })
        wsHandler.notifyUser("users-list-update")
        res.json(user)

    } catch (error) {
        console.log(error)
    }
})

router.post('/logout', async (req, res) => {
    const { email } = req.body

    try {
        await userDB.updateOne({ email }, { $set: { online: false } })
        wsHandler.notifyUser("users-list-update")
    } catch (error) {
        console.log(error)
    }
})

router.post("/block", async (req, res) => {
    const { userWantsToBlock, userToBeBlocked, whatToDo } = req.body
    try {

        if (whatToDo === "Block") {
            const dbResponse = await userDB.updateOne(
                { email: userWantsToBlock },
                {
                    $push: { blockedUsers: userToBeBlocked }
                })
        } else {
            const dbResponse = await userDB.updateOne(
                { email: userWantsToBlock },
                {
                    $pull: { blockedUsers: userToBeBlocked }
                }
            )
        }

        const user = await userDB.find({ email: userWantsToBlock })
        wsHandler.notifyUser("users-list-update")
        res.json(user[0])

    } catch (error) {
        console.log(error)
    }
})


module.exports = router