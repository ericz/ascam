var room;
var last;
var ascii;

var video;
var canvas;
var ascii;
var ctx;
var localMediaStream;

var broadcasting = false;
var show = true;
var asciiWorker = new Worker("/js/jsascii.js");
asciiWorker.onmessage = draw;
        
var client = new BinaryClient('ws://localhost:9000');
var stream;
client.on('open', function(){
  stream = client.createStream({room: room, type: 'write'});
});


$(function(){
  video = document.getElementById('v');
  canvas = document.getElementById('c');
  ascii = document.getElementById("ascii");
  last = document.getElementById("last");
  
  ctx = canvas.getContext('2d');

  $(ascii).width($(last).outerWidth())
  $(ascii).height($(last).outerHeight());
  $(ascii).css('visibility', 'visible');
  $(last).css('visibility', 'visible');

  function fail(){
    alert('fail');
  }
  
  // Not showing vendor prefixes or code that works cross-browser.
  navigator.webkitGetUserMedia({video: true}, function(stream) {
    video.src = window.webkitURL.createObjectURL(stream);
    localMediaStream = stream;
    setInterval(frame, 150);
  }, fail);
  
  $("#startbtn").toggle(function(){
    broadcasting = true;
    $("#indicator").stop().animate({opacity: 0}, function(){
      $("#btntext").text("Stop broadcasting");
      $("#indicator").prop('src', '/images/green.png').animate({opacity: 1});
    });
  }, function(){
    $("#indicator").stop().animate({opacity: 0}, function(){
      $("#btntext").text("Start broadcasting");
      $("#indicator").prop('src', '/images/red.png').animate({opacity: 1});
    });
    broadcasting = false;
  });
  
});




/*
$(document).ready(function(){
  last = document.getElementById('last');


  
  $("#camera").webcam({
    onSave: function(data) {
      if(broadcasting && !stream.paused) {
        stream.write(data);
      }
      if(show) {
        asciiWorker.postMessage(data);
      } else {
        setZeroTimeout(webcam.save);
      }
    },
    onLoad: function(){webcam.save();}
  });
  
  
  $("#startbtn").toggle(function(){
    broadcasting = true;
    $("#indicator").stop().animate({opacity: 0}, function(){
      $("#btntext").text("Stop broadcasting");
      $("#indicator").prop('src', '/images/green.png').animate({opacity: 1});
    });
  }, function(){
    $("#indicator").stop().animate({opacity: 0}, function(){
      $("#btntext").text("Start broadcasting");
      $("#indicator").prop('src', '/images/red.png').animate({opacity: 1});
    });
    broadcasting = false;
  });
  
  $("#showbtn").toggle(function(){
    show = false;
    $("#btn2text").text("Start video");
  }, function(){
    $("#btn2text").text("Stop video");
    show = true;;
  });
  
});
*/

function frame() {
  if (localMediaStream) {
    ctx.drawImage(video, 0, 0, 100, 75);
    var data = ctx.getImageData(0,0, 100,75).data;
    asciiWorker.postMessage(data);
    // "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
   // document.querySelector('img').src = canvas.toDataURL('image/webp');
  }
}

function draw(event) {
  var strChars = event.data.str;
  ascii.removeChild(last);
  // can't get a span or div to flow like an img element, but a table works?
  last = document.createElement("div");
  last.innerHTML = strChars;
  ascii.appendChild(last);
  if(broadcasting && !stream.paused) {
    stream.write(event.data.buf);
  }
} 


