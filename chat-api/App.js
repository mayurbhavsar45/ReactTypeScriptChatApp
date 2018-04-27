var express = require("express"); // Web Framework
var app = express();
var cors = require("cors");
var mongoose = require("mongoose");
var socketIO = require('socket.io');
var http = require('http');


var Login_RegisterAPI = require("./Contollers/Login-RegisterController");
var Chat = require("./Contollers/ChatController");

// Change to any port as u wish
const port=8081;

//app.use(cors);
app.use(function(req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  //res.header("Access-Control-Allow-Methods", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  //res.header("Access-Control-Allow-Headers", "*");
  next();
});

var server = http.createServer(app);

var io=socketIO(server);

io.on('connection',function (socket) {
   // console.log("User Connected");
  socket.on('change color',function (color) {
    console.log('Color Changed to: ', color);
    io.sockets.emit('change color', color);
  });
  socket.on('FetchLatestChannels',function (listOfChannels) {
    io.sockets.emit('FetchLatestChannels', listOfChannels);
  });
  socket.on('FetchLatestMessageList',function (listOfMessages) {
    io.sockets.emit('FetchLatestMessageList', listOfMessages);
  });
  socket.on('disconnect', function (){
    // console.log('user disconnected');
  });
});

server.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  const URL = "mongodb://localhost/chatapp";

  //Connect to our mongoDB database on cloud of mlab.com
  mongoose.connect(URL);
  Login_RegisterAPI(app);
  Chat(app);
  
  console.log("app listening at http://%s:%s", host, port);
});
