var mongoskin = require('mongoskin')
var Server = mongo.Server;
var DB = mongo.Db;
var BSON = mongo.BSONPure;

var host = 'localhost';
var port = '27017';

var path = process.env.MONGOHQ_URL || 'mongodb://' + host + ':' + port + '/';
var db = mongoskin.db(path);

db.open(function (err, db) {
  if (!err) {
    console.log('Connected to "roomdb" database');
    db.collection('rooms', {safe: true}, function (err, collection) {
      if (err) {
        console.log("The 'rooms' collection doesn't exist. Creating it with sample data...");
        populateDB();
      }
    });
  }
});