const express = require("express")
const mongoose = require("mongoose")
const wsHandler = require('./webSocket')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const PORT = 3001
const app = express();
const redis = require('redis')

//Redis connection
// const client = redis.createClient({
//     host: "localhost",
//     port: 6379,//default port
// })
// client.on("error", (error) => {
//     console.log(error)
// })


// Socket connection ...
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
wsHandler.initialize(server)

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use("/api", require('./apiRouter'))



// mongodb connection
mongoose.connect(
    'mongodb://localhost:27017/chat-app',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => server.listen(PORT, () => console.log(`Server is up on port ${PORT}`)))
    .catch(error => console.log(error))

