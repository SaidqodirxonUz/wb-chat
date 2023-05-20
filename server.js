const express = require("express")
const { Server } = require("socket.io")


const app = express()


app.use(express.static(__dirname + "/public"))

const server = app.listen(9000, console.log("ok"))

const io = new Server(server)

io.on("connection", socket => {
    socket.on("new-user", user => {
        socket.broadcast.emit("user", user)
    })


    socket.on("new-message", data => {
        socket.broadcast.emit("message", data)
    })

    socket.on("typing-user", user => {
        socket.broadcast.emit("typing", user)
    })
})