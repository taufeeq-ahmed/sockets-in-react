const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server: socketServer } = require('socket.io')

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new socketServer(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', "DELETE"]
    }
})

io.on('connection',(socket)=>{
    socket.on('send_message_event',(data)=>{
        // console.log('The data is received : ',data)
        socket.broadcast.emit('received_message_event',data)
        // learn more about socket.to() method
    })
})

server.listen('5000', () => {
    console.log("HTTP server on 5000");
})
