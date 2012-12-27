function initPlayer() {
  jQuery("#player").tubeplayer({
  	width: 560,
  	height: 315,
    showControls: 0, // whether the player should have the controls visible, 0 or 1
    showRelated: 0, // show the related videos when the player ends, 0 or 1
  	initialVideo: "", // the video that is loaded into the player 
    autoPlay: true, // whether the player should autoplay the video, 0 or 1
    autoHide: true, 
    showinfo: false, // if you want the player to include details about the video
    modestbranding: false, // specify to include/exclude the YouTube watermark
    wmode: "transparent", // note: transparent maintains z-index, but disables GPU acceleration
    swfobjectURL: "http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",
    iframed: true, // iframed
  	onPlayerPlaying: function(){}
  });
};

function play() {
  jQuery("#player").tubeplayer("play");
};

function play(videoId) {
  if (videoId == "") {
    play();
  } else {
    stop();
    jQuery("#player").tubeplayer("play", videoId);
  }
};

var socket = io.connect();
socket.on('connect', function () {
  console.log('Socket connected');
  initPlayer();

  socket.on('changeRoomVideo', function (video) {
    console.log('changeRoomVideo triggered');
    console.log(video);
    $('#youtube-data').html(video['youtube']['youtube']);
    play(video['youtube']['youtube']);
  });
});

$('.changeRoomVideo').click(function (event) {
  event.preventDefault();
  console.log('changeRoomVideo called');
  var input = document.getElementById('youtube').value;
  socket.emit('changeRoomVideo', { 'youtube': input });
});