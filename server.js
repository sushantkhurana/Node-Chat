// Created by Sushant Khurana (www.sukh.us)  

var app = require('express').createServer(),
io = require('socket.io').listen(app),
fs = require("fs")
dbapi = require("./db_ops");

app.configure(function(){
    dbapi.connect_db();
});

app.listen(8024);

app.get('/js/*', function(req, res){
    res.sendfile(__dirname+'/static/js/' + req.params[0]);
});

app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fs.readFileSync(__dirname + '/templates/index.html', 'utf-8'));
    res.end();
});

io.sockets.on('connection', function (socket) {
    //do stuff when a single user connects
    socket.on('chat', function (message) { 
        // add messaging relay logic here
        if(message['type'] == 'user'){
            socket.broadcast.send(message['user'] + ' connected to chat');
            socket.send('You are now connected to chat');
            dbapi.add_user(message);
        }else{
            socket.broadcast.send(message['user'] + ' : '+ message['chat']);
            socket.send('You : ' + message['chat']);
            dbapi.add_chat(message);
        }
    });
    socket.on('disconnect', function () { 
        // add logic of user disconnected
        console.log('user disconnected');
    });

});


