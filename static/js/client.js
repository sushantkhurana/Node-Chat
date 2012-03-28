// Created by Sushant Khurana (www.sukh.us)  

var socket = null;
var self = $(this);

$('.start_chat').unbind('click').bind('click', function(){
    var username = $('.user_id').val();
    if(username){
        startchat(username);
        self.data.username = username;
    }else{
        console.debug('enter username');
    }
});

var startchat = function(data){
    $('.add_user').addClass('hide');
    $('.chatroom').removeClass('hide');
    connect_to_server(data);
};

$('.send_chat').unbind('click').bind('click', function(){
    var chat = $('.messg').val();
    socket.emit('chat', {user : self.data.username, chat:chat, type:'message'});
    $('.messg').val('');
});

var connect_to_server = function(username){
    socket = io.connect('http://localhost/');
        socket.on('connect', function () {
        //username : connected   
        socket.emit('chat', {type:'user', user:username});

        socket.on('message', function (message) {
            // read message and append chat text
            $('.chat_window').append("<div class='message span12'>"+message+"</div>")
        });
    });
};
