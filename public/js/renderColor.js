
		var w = 100;
		var h = 75;

    this.onmessage = function(event) {
         
      var img = event.data;

      var strChars = '';
      for (var y = 0; y < h; y++) {
        var row = y*w*2;
        for(var x = 0; x < w; x++) {
         
          var loc = row+x*2;
          
          var b1 = img[loc];
          var b2 = img[loc+1];
 
          
          var idx = b1 >> 4;
          var r = b1 & 15;
          var g = b2 >> 4;
          var b = b2 & 15;
            
          strChars += "<span style='"
            + "background-color:rgb("+r*16+","+g*16+","+b*16+");"
            + "'>&nbsp;&nbsp;</span>";
          
          //strChars += '(' + r + ',' + g +  ',' + b + ',' + idx + ')';
          //strChars += '(' + loc + ')';
        }
        strChars += "\n";
      }
      postMessage(strChars);
    }

