var mongo = require('mongo');
var Server = mongo.Server;
var DB = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new DB('roomdb', server, {safe: true});

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

exports.findByTitle = function (req, res) {
  var title = req.params.title;
  console.log('Retrieving room: ' + title);
  db.collection('rooms', function (err, collection) {
    item = db.collection.find({title: title });
    res.send(item);
  });
};

exports.findAll = function (req, res) {
  db.collection('rooms', function (err, collection) {
    collection.find().toArray(function (err, items) {
      res.send(items);
    });
  });
};

exports.addRoom = function (req, res) {
  var room = req.body;
  console.log('Adding room: ' + JSON.stringify(room));
  db.collection('rooms', function (err, collection) {
    collection.insert(room, {safe: true}, function (err, result) {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        console.log(result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
};

/*--------------------*/
// Populate DB
var populateDB = function() {
  var rooms = [
  {
    name: 'Dubstep',
    title: 'dubstep'
  },
  {
    name: 'Pop Music Videos',
    title: 'pop-music-videos'
  },
  {
    name: 'Country Music Videos',
    title: 'country-music-videos'
  },
  {
    name: 'Video Game Replays',
    title: 'video-game-replays'
  }];
  
  db.collection('rooms', function (err, collection) {
    collection.insert(rooms, {safe: true}, function (err, result) {});
  });
};