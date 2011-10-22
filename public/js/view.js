var room;
var last;
var ascii;

var broadcasting = false;

$(document).ready(function(){
  last = document.getElementById('last');
  ascii = document.getElementById("ascii");
  
  now.receiveFrame = function(data) {
    var asciiWorker = new Worker("/js/jsascii.js");
    asciiWorker.onmessage = draw;
    asciiWorker.postMessage(data);
  }
  
  now.ready(function(){
    now.joinRoom(room);
  });
  
});

function draw(event) {
  var strChars = event.data;
  ascii.removeChild(last);
  // can't get a span or div to flow like an img element, but a table works?
  last = document.createElement("div");
  last.innerHTML = strChars;
  ascii.appendChild(last);
} 

