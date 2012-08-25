var room;
var last;
var ascii;

var broadcasting = false;
var color = false;
var colorWorker = new Worker("/js/renderColor.js");
colorWorker.onmessage = draw;
var asciiWorker = new Worker("/js/render.js");
asciiWorker.onmessage = draw;
var client = new BinaryClient('ws://'+window.location.hostname+':9001');
var stream;
client.on('open', function(){
  stream = client.createStream({room: room, type: 'read'});
  stream.on('data', function(data) {
    if(color) {
      colorWorker.postMessage(new Uint8Array(data));
    } else {
      asciiWorker.postMessage(new Uint8Array(data));
    }
  });
});

$(document).ready(function(){
  last = document.getElementById('last');
  ascii = document.getElementById("ascii");
  $(ascii).width($(last).outerWidth())
  $(ascii).height($(last).outerHeight());
  $(ascii).css('visibility', 'visible');
  $(last).css('visibility', 'visible');
  
  $("#showbtn").toggle(function(){
    color = true;
    $("#btn2text").text("ASCII Mode");
  }, function(){
    color = false;
    $("#btn2text").text("Color Mode");
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

