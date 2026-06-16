var express = require('express');
var NEDB = require("nedb-promises");
var Game = new NEDB({filename:"game.db", autoload:true});
var server = express();
var bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// ==========================================
//Godot 4 網頁跨域標頭
// ==========================================
server.use((req, res, next) => {
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    next();
});

// 設定 public 資料夾為網頁根目錄
server.use(express.static(__dirname + '/public'));

server.get('/', function(req, res){
    res.send('Hello world!');
});

// 抓取前 10 名分數
server.get('/hiscore', function(req, res){
    Game.find({}).sort({score:-1}).limit(10).then(result=>{
        res.send(result);
    });
});

// 接收玩家上傳的分數
server.post('/hiscore', function(req, res){
    var data = req.body;
    Game.insert(data);
    res.send("OK");
});

//讓 Render 動態分配 Port
var port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log("Web server is running on port " + port);
});