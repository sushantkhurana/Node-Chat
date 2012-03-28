// Created by Sushant Khurana (www.sukh.us)  

var mongodb = require("mongodb");
var dba;

exports.connect_db = function(){
    var DBHOST = '127.0.0.1';
    var DBPORT = 27017;
    var DBNAME = 'chat_db';

    var on_open = function(err, db){
        if(err){
            console.log(err);
            return false;
        }
        db.on("close", function(error){
            console.log("--- dbmessage : disconnected from database ---");
        });
        console.log('--- dbmessage : connected to database ---');
        dba = db;
    };

    mongoserver = new mongodb.Server(DBHOST, DBPORT, {'auto_reconnect':true});
    db_connector = new mongodb.Db(DBNAME, mongoserver, {});
    db_connector.open(on_open);
};

exports.get_collections = function(){
    if(dba){
    dba.collectionNames(function(err, collections){
        console.log(collections);
    });}
};

exports.add_user = function(data){
    //add a user to user collection
    if(dba){
        dba.collection('user', function(err, collection){
            collection.insert(data, {safe:true}, function(err, record){
                console.log('user added to collection');
            });
        });
    }
};

exports.remove_user = function(data){
    //write remove_user logic
};

exports.add_chat = function(data){
    if(dba){
        dba.collection('chat', function(err, collection){
            collection.insert(data, {safe:true}, function(err, record){
                console.log('chat saved');
            });
        });
    }
};
