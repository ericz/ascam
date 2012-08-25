var room;
var last;
var ascii;

var broadcasting = false;
var asciiWorker = new Worker("/js/render.js");
asciiWorker.onmessage = draw;
var client = new BinaryClient('ws://'+window.location.hostname+':9001');
var stream;
client.on('open', function(){
  stream = client.createStream({room: room, type: 'read'});
  stream.on('data', function(data) {
    asciiWorker.postMessage(new Uint8Array(data));
  });
});

$(document).ready(function(){
  last = document.getElementById('last');
  ascii = document.getElementById("ascii");
  $(ascii).width($(last).outerWidth())
  $(ascii).height($(last).outerHeight());
  $(ascii).css('visibility', 'visible');
  $(last).css('visibility', 'visible');
});

function draw(event) {
  var strChars = event.data;
  ascii.removeChild(last);
  // can't get a span or div to flow like an img element, but a table works?
  last = document.createElement("div");
  last.innerHTML = strChars;
  ascii.appendChild(last);
} 

