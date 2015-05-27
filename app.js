var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('client'));

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('send message', function(data) {
        console.log('Message received: ' + data.message);
        io.emit('new message', data);
    });

});

http.listen(3000, function(){
    console.log('Listening on *:3000');
});