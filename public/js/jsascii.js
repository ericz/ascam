
    var charList = [" ", ".", ",", ":", ";", "i", "1", "t", "f", "L", "C", "G", "0", "8", "@"];
   
    var cli = charList.length-1;
    
		var w = 100;
		var h = 75;

    this.onmessage = function(event) {
      
    
      var img = event.data;
      
      var buf = new Uint8Array(15000);
      var strChars = '';
      for (var y = 0; y < h; y++) {
        var outRow = y*w*2;
        var row = outRow*2;
        for(var x = 0; x < w; x++) {
         
          var loc = row+x*4;
          var outLoc = outRow+x*2;
          
          var r = img[loc];
          var g = img[loc+1];
          var b = img[loc+2];
          
          var rr = Math.floor(r/16);
          var gr = Math.floor(g/16);
          var br = Math.floor(b/16);
          
          var bright = (0.3*r + 0.59*g + 0.11*b) / 255;
          var idx = (cli) - Math.round(bright * (cli));
        
          var char = charList[idx];
 
          strChars += "<span style='"
            + "color:rgb("+rr*16+","+gr*16+","+br*16+");"
            + "'>" + char + char + "</span>";
            
         // strChars += '(' + r + ',' + g +  ',' + b + ',' + a + ')';
          
          buf[outLoc] = (idx << 4) + rr;
          buf[outLoc+1] = (gr << 4) + br;
        }
        strChars += "\n";
      }
      postMessage({str: strChars, buf: buf});
    }

