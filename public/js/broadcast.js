var room;
var last;
var ascii;

var broadcasting = false;
var show = true;
var asciiWorker = new Worker("/js/jsascii.js");
asciiWorker.onmessage = draw;
        
var client = new BinaryClient('ws://localhost:9000');
var stream;
client.on('open', function(){
  stream = client.createStream({room: room, type: 'write'});
});

$(document).ready(function(){
  last = document.getElementById('last');
  ascii = document.getElementById("ascii");
  

  
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

function draw(event) {
  var strChars = event.data;
  ascii.removeChild(last);
  // can't get a span or div to flow like an img element, but a table works?
  last = document.createElement("div");
  last.innerHTML = strChars;
  ascii.appendChild(last);
  setZeroTimeout(webcam.save);
} 

