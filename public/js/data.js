this.onmessage = function (event) {
  var data = event.data;

  var col = data.split(";");
                
  for(var i = 0; i < 320; i+=4) {
        var tmp = parseInt(col[i]);
        img[pos + 0] = (tmp >> 16) & 0xff;
        img[pos + 1] = (tmp >> 8) & 0xff;
        img[pos + 2] = tmp & 0xff;
        img[pos + 3] = 0xff;
        pos += 16;
  }
  if (pos >= 4 * 320 * 240) {
      asciiWorker = new Worker("ascii.js");
      asciiWorker.postMessage(data);
      var data = Iuppiter.compress(img);
      //now.sendFrame(data, clientId);
      pos = 0;
      img = [];
  }
};
  
  
  