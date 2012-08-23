var room;
var last;
var ascii;

var broadcasting = false;
var asciiWorker = new Worker("/js/jsascii.js");
asciiWorker.onmessage = draw;
var client = new BinaryClient('ws://localhost:9000');
var stream;
client.on('open', function(){
  stream = client.createStream({room: room, type: 'read'});
  stream.on('data', function(data) {
    asciiWorker.postMessage(data);
  });
});

$(document).ready(function(){
  last = document.getElementById('last');
  ascii = document.getElementById("ascii");
});

function draw(event) {
  var strChars = event.data;
  ascii.removeChild(last);
  // can't get a span or div to flow like an img element, but a table works?
  last = document.createElement("div");
  last.innerHTML = strChars;
  ascii.appendChild(last);
} 

