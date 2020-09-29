# Web Socket Protocol

### full-duplex communication
* bi-directional communication, whereas the HTTP is unidirectional
* persistent connection; the client-server stays connected
  * allows real-time applications by allowing the server to arbitrarily send data to the client


## socket.io
> npm i socket.io\

### Example
```javascript
// @server
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
/*
  express module does `http.createServer` without calling it
  manually call `createServer` upon `app` for refactoring the code
  to slightly change its behavior to use socket.io
*/
const server = http.createServer(app)
const io = socketio(server) // raw http server

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  // emitting to the client
  socket.emit('countUpdated', count)
  socket.broadcast.emit('message', 'A new user has joined!') // for emitting to everybody except the sender
  
  // listening to the client
  socket.on('increment', () => {
    count++
    // socket.emit('countUpdated', count) // for emitting to single client
    io.emit('countUpdated', count) // for emitting to every connection
  })

  // when a socket disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!')
  })
})

// call listen on newly made `server`
server.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
```
```javascript
// @client
const socket = io() // the client is able to connect to WebSocket from `/socket.io/socket.io.js` statement in html

socket.on('countUpdated', (count) => {
  console.log('The count has been updated', count)
})

document.querySelector('#increment').addEventListener('click', () => {
  console.log('Clicked')
  socket.emit('increment')
})
```
```html
<!-- need to implement scripts from socket.io module -->
<script src="/socket.io/socket.io.js"></script>
```