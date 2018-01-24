var accXPrev, accYPrev, accZPrev;
function onsuccesscallbackstartmonitoringAcc(startmonitoringdata) {
  try {
    var accX = startmonitoringdata.x;
    var accY = startmonitoringdata.y;
    var accZ = startmonitoringdata.z;
    var difference = 2.5;
    if (accXPrev !== undefined) {
      if (accXPrev - accX > difference || accYPrev - accY > difference || accZPrev - accZ > difference) {
        cookies += cpc;
        score += cpc;
        kony.application.getCurrentForm().cookieCount.text = cookies.toFixed(0);
      }
    }
    accXPrev = accX;
    accYPrev = accY;
    accZPrev = accZ;
  } catch (e) {}
}
	
function onfailurecallbackstartmonitoringAcc(error) {
    alert("Accelerometer is not supported in the device.");
}
function startmonitoringAcc() {
   try {
      kony.accelerometer.startMonitoringAcceleration(
         onsuccesscallbackstartmonitoringAcc, 
         onfailurecallbackstartmonitoringAcc, 
         {frequency : 150, onChange : false} );                                                                                   
   }
   catch (e) {
//       alert("Accelerometer is not supported.");
   }
}