var player;

/*
  Lyrics Handling
*/

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


/*
  Video Handling
*/

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-player', {
    height: '390',
    width: '640',
    videoId: 'hI8A14Qcv68',
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
  var key = "AIzaSyDX49nkp_0FliM0oONBBfD5xqVIh7-8rkM";
  var url = "https://www.googleapis.com/youtube/v3/search?q=" + bandAndsong + "&part=snippet&type=video&key=" + key;

  var request = new XMLHttpRequest();
  request.onload = handleVideo;
  request.open('GET', url, true);
  request.send();
}

function handleVideo() {
  var data = JSON.parse(this.responseText);
  player.loadVideoById(data.items[0].id.videoId);
  additionalVideos(data);
  console.log(data);
}


/*
  Search inputs
*/

var input = document.getElementById('song-input');
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    var bandAndsong = document.getElementById('song-input').value;
    if (bandAndsong.trim() != "") {
      getVideo(bandAndsong);
      bandAndsong = bandAndsong.split(', ');
      bandAndsong[0] = bandAndsong[0].trim();
      bandAndsong[1] = bandAndsong[1].trim();
      bandAndsong[0] = bandAndsong[0].replace(" ", "+");
      bandAndsong[1] = bandAndsong[1].replace(" ", "+");
      getLyrics(bandAndsong[0], bandAndsong[1]);
    } else {
      getVideo("Rick Astley - Never Gonna Give You Up");
      getLyrics("Rick Astley", "Never Gonna Give You Up");
    }
  }
});

var search = document.getElementById('search');
search.addEventListener('click', function(event) {
    var bandAndsong = document.getElementById('song-input').value;
    if (bandAndsong.trim() != "") {
      getVideo(bandAndsong);
      bandAndsong = bandAndsong.split(', ');
      bandAndsong[0] = bandAndsong[0].trim();
      bandAndsong[1] = bandAndsong[1].trim();
      bandAndsong[0] = bandAndsong[0].replace(" ", "+");
      bandAndsong[1] = bandAndsong[1].replace(" ", "+");
      getLyrics(bandAndsong[0], bandAndsong[1]);
    } else {
      getVideo("Rick Astley - Never Gonna Give You Up");
      getLyrics("Rick Astley", "Never Gonna Give You Up");
    }
});


/*
  Additional Options
  Sources: https://www.abeautifulsite.net/adding-and-removing-elements-on-the-fly-using-javascript
*/

function addElement(parent, tag, id, html) {
  parent = document.getElementById(parent);
  var element = document.createElement(tag);
  element.setAttribute('id', id);
  element.innerHTML = html;
  parent.appendChild(element);
}

function removeElement(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}

function additionalVideos(data) {
  removeElement('additional-videos');
  addElement('optional-videos', 'ol', 'additional-videos', '<li> <a href=\'https://www.youtube.com/watch?v=' + data.items[1].id.videoId + '\'>' + data.items[1].snippet.title + '</a> </li><li> <a href=\'https://www.youtube.com/watch?v=' + data.items[2].id.videoId + '\'>' + data.items[2].snippet.title + '</a> </li><li> <a href=\'https://www.youtube.com/watch?v=' + data.items[3].id.videoId + '\'>' + data.items[3].snippet.title + '</a> </li>')
}
