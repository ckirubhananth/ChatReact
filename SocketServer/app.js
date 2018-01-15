/*
   app.js is the module that runs in the server-side as socket manager
   Any application can use this independent server to send and receive data through socket.

   This app makes use of the module socket.io

   'send' and 'receive' are the events that are specified to send and receive messages from the socket client.

*/
var express = require('express');
var socket = require('socket.io');
var mongoose = require('mongoose');

// Create a HTTP server
var app = express();

// mongoose model to write to DB
var chatSchema = mongoose.Schema({}, { strict: false });
var chatMsg = mongoose.model('chatMsg', chatSchema);

// Start the HTTP Server
server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

// Create a socket
io = socket(server);


// Event that will be triggered on a connection
io.on('connection', (socket) => {
    socket.on('send', function(data){
        writeToDB(data);
        //Event that will emit the data into the socket
        io.emit('receive', data);
    })
});

// Log into mongoDB
writeToDB = function(data) {
    mongoose.connect('mongodb://localhost/chatApp');

    var db = mongoose.connection;
    var objMSG = new chatMsg(data);
    objMSG.save();

}