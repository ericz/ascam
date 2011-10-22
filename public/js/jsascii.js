
    var aDefaultCharList = (" .,:;i1tfLCG08@").split("");
    var aDefaultColorCharList = (" CGO08@").split("");
    var strFont = "courier new";


    var iScale = 3;
		var bColor = true;
		var bAlpha = false;
		var bBlock = false;
		var bInvert = false;
		var strResolution = "medium";
		var aCharList = (bColor ? aDefaultColorCharList : aDefaultCharList);

		var fResolution = 0.5;
		/*switch (strResolution) {
			case "low" : 	fResolution = 0.25; break;
			case "medium" : fResolution = 0.5; break;
			case "high" : 	fResolution = 1; break;
		}*/

    
		var iWidth = 160;
		var iHeight = 120;

    this.onmessage = function(event) {
      
    
      var img = event.data;
    
      img = img.split("*");
      var strChars = "";

      for (var y=0;y<iHeight;y+=2) {
        var data = img[y];
        var col = data.split(';');
        for(var i = 0; i < iWidth; i+=1) {
          var tmp = col[i];
          var iRed = (tmp >> 16) & 0xff;
          var iGreen = (tmp >> 8) & 0xff;
          var iBlue = tmp & 0xff;
          var iAlpha = 0xff;
               
      
      
          if (iAlpha == 0) {
            var iBrightIdx = 0;
          } else {
            var fBrightness = (0.3*iRed + 0.59*iGreen + 0.11*iBlue) / 255;
            var iCharIdx = (aCharList.length-1) - Math.round(fBrightness * (aCharList.length-1));
          }
        

      
          var strThisChar = aCharList[iCharIdx];

          if (strThisChar == " ") 
            strThisChar = "&nbsp;";
 
          strChars += "<span style='"
            + "color:rgb("+iRed+","+iGreen+","+iBlue+");"
            + (bBlock ? "background-color:rgb("+iRed+","+iGreen+","+iBlue+");" : "")
            + (bAlpha ? "opacity:" + (iAlpha/255) + ";" : "")
            + "'>" + strThisChar + "</span>";
          
        }
        strChars += "<br/>";
      }
      postMessage(strChars);
    }

