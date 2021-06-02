const socketio = require("socket.io")
const { emit } = require("./chat/chatSchema")

const ws = {
    io: null,
}

module.exports.initialize = (server) => {
    ws.io = socketio(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    })
    ws.io.on('connection', (socket) => {
        console.log('user connected to websocket')
        setInterval(() => {
            socket.emit("get-data", "hello")
        }, 1000)
        socket.on("disconnect", () => {
            console.log("user disconnected")
        })
    })
}

module.exports.io = () => ws.io;

module.exports.notifyUser = (emitString) => {
    try {
        // if (data !== undefined)
        //     ws.io.emit(emitString, data)
        // else
        ws.io.emit(emitString)

    } catch (error) {
        console.log(error)
    }
}
