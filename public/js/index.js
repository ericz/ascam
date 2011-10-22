var room;
var last;
var ascii;

var broadcasting = false;

$(document).ready(function(){
  last = document.getElementById('last');
  ascii = document.getElementById("ascii");
  
  now.receiveFrame = function(data) {
    var asciiWorker = new Worker("js/jsascii.js");
    asciiWorker.onmessage = draw;
    asciiWorker.postMessage(data);
  }
  
  $("#camera").webcam({
    onSave: function(data) {
      if(broadcasting) {
        now.sendFrame(data, room);
      }
      var asciiWorker = new Worker("js/jsascii.js");
      asciiWorker.onmessage = draw;
      asciiWorker.postMessage(data);
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
  
});

function draw(event) {
  var strChars = event.data;
  ascii.removeChild(last);
  // can't get a span or div to flow like an img element, but a table works?
  last = document.createElement("div");
  last.innerHTML = strChars;
  ascii.appendChild(last);
  setTimeout(webcam.save, 500);
} 

