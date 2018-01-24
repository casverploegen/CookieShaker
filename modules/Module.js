// The accelerometer module is used to store all functions that are necessary for the accelerometer in the app to
// work. When the device is shaken, the amount of cookies will be increased.


// the startmonitoringAcc function is used to start the accelerometer in the device through the app, if an
// accelerometer is available in the device. It starts monitoring the X, Y and Z values of the accelerometer
// every 150 milliseconds, which is later used to see whether the device is shaken.
function startmonitoringAcc() {
   try {
      kony.accelerometer.startMonitoringAcceleration(
         onsuccesscallbackstartmonitoringAcc, 
         onfailurecallbackstartmonitoringAcc, 
         {frequency : 150, onChange : false} );                                                                                   
   }
   catch (e) {}
}

// The onsuccesscallbackstartmonitoringAcc function will be called if an accelerometer is available in the device.
// It calculates whether the device has moved enough to be counted as a "shake".
var accXPrev, accYPrev, accZPrev; // Store the values of the accelerometer, since these need to be used between
// 2 instances of the function.
function onsuccesscallbackstartmonitoringAcc(startmonitoringdata) {
  try {
    // Get the X, Y and Z values of the acceleromater
    var accX = startmonitoringdata.x;
    var accY = startmonitoringdata.y;
    var accZ = startmonitoringdata.z;
    var difference = 2.5; // Set the threshold (difference) variable
    if (accXPrev !== undefined) {
      // If the difference between the previous X and the current X value is bigger than the set threshold, the
      // movement of the device will be counted as a shake. The same holds for the Y and Z values, since the
      // device can be shaken in multiple directions.
      if (accXPrev - accX > difference || accYPrev - accY > difference || accZPrev - accZ > difference) {
        // The amount of cookies and score will be increased by cpc with every shake.
        cookies += cpc;
        score += cpc;
        kony.application.getCurrentForm().cookieCount.text = cookies.toFixed(0); // Update the cookie Text display
      }
    }
    // Save the current values of the accelerometer, so these will be the previous values in the next iteration.
    accXPrev = accX;
    accYPrev = accY;
    accZPrev = accZ;
  } catch (e) {}
}

// The onfailurecallbackstartmonitoringAcc will be called if the accelerometer is not supported in the device.
// An alert will be shown to the user to notify them of this unfortunate fact.
function onfailurecallbackstartmonitoringAcc(error) {
    alert("The accelerometer is unfortunately not supported in the device.");
}