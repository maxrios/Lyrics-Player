function getLyrics(band, song) {
  var string = 'https://api.lyrics.ovh/v1/' + band + '/' + song + '/';

  var request = new XMLHttpRequest();
  request.onload = handleLyrics;
  request.open('GET', string, true);
  request.send();
}

function handleLyrics() {
  var data = JSON.parse(this.responseText);
  if (data.lyrics != undefined) {
    document.getElementById('lyrics').innerText = data.lyrics;
  } else {
    document.getElementById('lyrics').innerText = 'No Lyrics...';
  }
}


function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-player', {
    height: '390',
    width: '640',
    videoId: 'l9zdQUA-dsk',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}


function getVideo(bandAndsong) {
  var key = "";
  var url = "https://www.googleapis.com/youtube/v3/search?q=" + bandAndsong + "&part=snippet&type=video&key=" + key;

  var request = new XMLHttpRequest();
  request.onload = handleVideo;
  request.open('GET', url, true);
  request.send();
}

function handleVideo() {
  var data = JSON.parse(this.responseText);
  player.loadVideoById(data.items[0].id.videoId);
}

// Launch with one person activity
// searchByKeyword('linkin+park', 'numb');
var input = document.getElementById('song-input');
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    var bandAndsong = document.getElementById('song-input').value;
    getVideo(bandAndsong);
    bandAndsong = bandAndsong.split(', ');
    bandAndsong[0] = bandAndsong[0].trim();
    bandAndsong[1] = bandAndsong[1].trim();
    bandAndsong[0] = bandAndsong[0].replace(" ", "+");
    bandAndsong[1] = bandAndsong[1].replace(" ", "+");
    getLyrics(bandAndsong[0], bandAndsong[1]);
  }
});
