const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

let usersockets ={}

app.use('/', express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    console.log("New socket formed from " + socket.id)
    socket.emit('connected')

    socket.on('login',(data)=>{
       usersockets[data.user]=socket.id
       console.log(usersockets)
    })

  
    
    socket.on('send_msg', (data) => {
        if(data.message.startsWith('@')){
            let recipient = data.message.split(':')[0].substr(1)
            let rcptSocket = usersockets[recipient]
            io.to(rcptSocket).emit('recv_msg',data)
        }
        else{
       socket.broadcast.emit('recv_msg',data)
        }

})
})

server.listen(2347, () => console.log('Website open on http://localhost:2346'))