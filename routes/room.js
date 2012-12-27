require('../db/mongo.js');

exports.findByTitle = function (req, res) {
  var title = req.params.title;
  console.log('Retrieving room: ' + title);
  db.collection('rooms', function (err, collection) {
    collection.findOne({'title': title }, function (err, item) {
      res.render('room', {page: 'room', item: item});
    });
  });
};

exports.findAll = function (req, res) {
  db.collection('rooms', function (err, collection) {
    collection.find().toArray(function (err, items) {
      res.render('lounge', {page: 'lounge', items: items});
    });
  });
};

exports.updateRoom = function (req, res) {
  var title = req.params.title;
  var room = req.body;
  delete room._title;
  console.log('Updating room: ' + title);
  console.log(JSON.stringify(room));
  db.collection('rooms', function (err, collection) {
    collection.update({'_title': room.title}, room, {safe: true}, function (err, result) {
      if (err) {
        console.log('Error updating room: ' + err);
        res.send({'error': 'An error has occurred'});
      } else {
        console.log(result + ' document(s) updated');
        res.send(room);
      }
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

exports.deleteRoom = function (req, res) {
  var title = req.params.title;
  console.log('Deleting room: ' + title);
  db.collection('rooms', function (err, collection) {
    collection.remove({'_title': title}, {safe: true}, function (err, result) {
      if (err) {
        res.send({'error': 'An error has occurred - ' + err});
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