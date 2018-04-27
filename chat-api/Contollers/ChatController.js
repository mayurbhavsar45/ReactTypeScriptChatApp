var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var fs = require("fs");

// Create Schema of db
var channelSchema = mongoose.Schema({
  name: { type: String, unique: true },
  id: String,
  private: Boolean,
  between: Array
});

var messageSchema = mongoose.Schema({
  id: String,
  channelID: String,
  text: String,
  user: Object,
  time: String
});

//Create Model
var channelModel = mongoose.model("Channel", channelSchema);
var messageModel = mongoose.model("Message", messageSchema);

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// create application/json parser
var jsonParser = bodyParser.json();

module.exports = function(app) {
  app.get("/GetAllChannels", function(req, res) {
    channelModel.find({}, function(err, data) {
      if (err) {
        res.json({ error: "Some Error occured", errorDescription: err });
      } 
      res.json(data);
    });
  });
  app.get("/GetMessagesByChannel/:channelName", function(req, res) {
    var channelName = req.params.channelName.trim();
    messageModel.find({ channelID: channelName }, function(err, data) {
      if (err) {
        res.json({ error: "Some Error occured", errorDescription: err });
      }
      res.json(data);
    });
  });
  app.post("/AddChannel", jsonParser, function(req, res) {
    //get data from the view and save it to mongo db.
    var newChannel = channelModel(req.body).save(function(err, data) {
      if (err) {
        console.log(err);
        res.json({ error: "Some Error occured", errorDescription: err });
      }
      res.json(data);
    });
  });

  app.post("/SendMessage", jsonParser, function(req, res) {
    //get data from the view and save it to mongo db.
    var newMessage = messageModel(req.body).save(function(err, data) {
      if (err) {
        console.log(err);
        res.json({ error: "Some Error occured", errorDescription: err });
      }
      res.json(data);
    });
  });
};
