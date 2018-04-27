var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var fs = require("fs");

// Create Schema of db
var UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

//Create Model
var userModel = mongoose.model("User", UserSchema);

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// create application/json parser
var jsonParser = bodyParser.json();

module.exports = function(app) {
  app.post("/SignUp", jsonParser, function(req, res) {
    //get data from the view and save it to mongo db.
    var newUser = userModel(req.body).save(function(err, data) {
      if (err) {
        console.log(err);
        res.json({ error: "Some Error occured",errorDescription:err });
      }
      res.json(data);
    });
  });

  app.get("/SignIn/:username/:password", function(req, res) {
      var uName=req.params.username.trim(),
          password=req.params.password.trim();

      userModel.find({username:uName,password:password}, function(err, data) {
      if (err) {
          res.json({ error: "Some Error occured",errorDescription:err });
        }
      res.json(data);
    });
  });
};
