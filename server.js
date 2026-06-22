var express = require('express');
 
var NEDB = require("nedb-promises");
var Game = new NEDB({filename:"game.db", autoload:true})

var server = express();

var bodyParser  = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

server.use(express.static(__dirname + '/public'));

//Game.insert({score:2020, user:"MD"});

server.get('/', function(req, res){
    res.send('Hello world!');
});

server.get('/hiscore', function(req, res){
     //將排序依據改為 level
     Game.find({}).sort({level:-1}).limit(10).then(result=>{
        console.log(result);
        res.send(result);
    })
});
server.post('/hiscore', function(req, res){
    Game.insert(req.body);
    res.send("OK");
});
 
 
// server.get('*', function(req, res){
//     res.send("Page not found!", 404);
// })

server.listen(80);
console.log("Web server on port 8080");