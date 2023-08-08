//node server which will handle socket io connections 
const io = require('socket.io')(8000);
const users = {};
//io.on will listen socket conection shaista amreen..
io.on('connection', socket => {
    //socket.on =jis perticular connection ke sat jo hoga us ke sath kya hona chahiye
    socket.on('new-user-joined', name => {
        console.log('new user joined', name)
        users[socket.id] = name
        //boradcast.emit()=jis insan ne join kiya usko chor kr baki sb ko msg jaega joined ka, event triggered
        socket.broadcast.emit('user joined', name)
    });
    //send event will receive server call back function will run and will broadcast message to all
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    })
    //on left 
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })
})


/*
what does socket.on function
 on() Start listening for socket events from Sails with the specified eventName . 
 Triggers the provided callback function when a matching event is received.
*/