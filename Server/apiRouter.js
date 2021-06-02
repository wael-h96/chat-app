const express = require('express')
const apiRouter = express.Router()

apiRouter.use('/users', require('./users/usersRouter'));
apiRouter.use('/chat', require('./chat/chatRouter'))

module.exports = apiRouter