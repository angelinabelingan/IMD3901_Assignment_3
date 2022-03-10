const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...
console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/pink_team', function( req, res ){ 
    res.sendFile( __dirname + '/public/pink_team.html' );
});

app.get( '/blue_team', function( req, res ){ 
    res.sendFile( __dirname + '/public/blue_team.html' );
});

app.get( '/hunt', function( req, res ){ 
    res.sendFile( __dirname + '/public/hunt.html' );
});

//socket.io / websockets stuff 
io.on('connection', (socket) => {
    console.log(socket.id + ' is connected!');

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });

    socket.on('pink', (data) => {
        console.log('pink event received');
        io.sockets.emit('color_change', {r:253, g:185, b:200});
    });

    socket.on('blue', (data) => {
        console.log('blue event received');
        io.sockets.emit('color_change', {r:186, g:219, b:255});
    });

    socket.on('yellow', (data) => {
        console.log('yellow event received');
        io.sockets.emit('color_change', {r:255, g:229, b:124});
    });
});