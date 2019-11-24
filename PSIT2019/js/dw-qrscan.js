/*
@2018
Deveoped by DwThai.Com
Contact: dwthai@gmail.com
*/
var dwVDO, dwCanvasTag, dwVDOCanvas, QRhandle;
function DWTQR(c){ //by DwThai.Com
	dwVDO = document.createElement("video");
	dwCanvasTag=  document.getElementById(c);
	dwVDOCanvas = dwCanvasTag.getContext("2d");
}

function dwStartScan(){
		navigator.mediaDevices.getUserMedia({video: { facingMode: "environment" } }).then(function(stream){
		  dwVDO.srcObject = stream;
		  dwVDO.play();
		  QRhandle= requestAnimationFrame(dwQRScan);
		});
}

function dwQRScan() {
      if(dwVDO.readyState === dwVDO.HAVE_ENOUGH_DATA) {
        dwVDOCanvas.drawImage(dwVDO, 0, 0, dwCanvasTag.width, dwCanvasTag.height);
       var imgData = dwVDOCanvas.getImageData(0, 0, dwCanvasTag.width, dwCanvasTag.height);
       var qrcode = jsQR(imgData.data, imgData.width, imgData.height);//Using jsQR
				if(qrcode) {
				  var setBorder=qrcode.location;
				  borderCapture(setBorder.topLeftCorner, setBorder.topRightCorner);
				  borderCapture(setBorder.topRightCorner, setBorder.bottomRightCorner);
				  borderCapture(setBorder.bottomRightCorner, setBorder.bottomLeftCorner);
				  borderCapture(setBorder.bottomLeftCorner, setBorder.topLeftCorner);
				  var qrdata = qrcode.data;
					  if(qrdata!=""){
						  dwVDO.src=null;
						  dwQRReader(qrdata);
						  cancelAnimationFrame(QRhandle);
						  return;
					  }
				}
      }
       QRhandle=requestAnimationFrame(dwQRScan);
}

function borderCapture(begin, end) {
      dwVDOCanvas.beginPath();
      dwVDOCanvas.moveTo(begin.x, begin.y);
      dwVDOCanvas.lineTo(end.x, end.y);
      dwVDOCanvas.lineWidth = 3;
      dwVDOCanvas.strokeStyle = "#0E0";
      dwVDOCanvas.stroke();
}