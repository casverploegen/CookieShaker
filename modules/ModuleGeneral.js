// The database module is written as a module that is closed of from the rest of the app, through making use
// of a special function syntax, as can be seen below. This way, the variables and function used in this
// module aren't visible outside the module, which avoids conflicts.
// Function of this modules are used in the following way:   database.functionName();

function initVars() {
  score = 0;
  cookies = 0;
  cpc = 1;
  cps = 0;
  priceFinger = 40;
  ownedFinger = 0;
  priceBakery = 200;
  ownedBakery = 0;
  priceDevice = 600;
  ownedDevice = 0;
}

function loadVars() {
  try {
    if (kony.store.getItem("score") !== null) {
      score = kony.store.getItem("score");
    }
    if (kony.store.getItem("cookies") !== null) {
      cookies = kony.store.getItem("cookies");
    }
    if (kony.store.getItem("cpc") !== null) {
      cpc = kony.store.getItem("cpc");
    }
    if (kony.store.getItem("cps") !== null) {
      cps = kony.store.getItem("cps");
    }
    if (kony.store.getItem("priceFinger") !== null) {
      priceFinger = kony.store.getItem("priceFinger");
    }
    if (kony.store.getItem("ownedFinger") !== null) {
      ownedFinger = kony.store.getItem("ownedFinger");
    }
    if (kony.store.getItem("priceBakery") !== null) {
      priceBakery = kony.store.getItem("priceBakery");
    }
    if (kony.store.getItem("ownedBakery") !== null) {
      ownedBakery = kony.store.getItem("ownedBakery");
    }
    if (kony.store.getItem("priceDevice") !== null) {
      priceDevice = kony.store.getItem("priceDevice");
    }
    if (kony.store.getItem("ownedDevice") !== null) {
      ownedDevice = kony.store.getItem("ownedDevice");
    }
  } catch (e) {}
}
function saveVars() {
  try {
    kony.store.setItem("score", score);
    kony.store.setItem("cookies", cookies);
    kony.store.setItem("cpc", cpc);
    kony.store.setItem("cps", cps);
    kony.store.setItem("priceFinger", priceFinger);
    kony.store.setItem("ownedFinger", ownedFinger);
    kony.store.setItem("priceBakery", priceBakery);
    kony.store.setItem("ownedBakery", ownedBakery);
    kony.store.setItem("priceDevice", priceDevice);
    kony.store.setItem("ownedDevice", ownedDevice);
  } catch (e) {}
}

function getUserID() {
  if (kony.store.getItem("username") !== null) {
    var rawData = database.loadData();
    var usernameSelf = kony.store.getItem("username");
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].username == usernameSelf) {
        userID = rawData[i]._id;
      }
    }
  }
}

function updateDataGrid(self) {
  var usernameSelf = kony.store.getItem("username");
  self.view.scoreTable.removeAll(); //clear the datagrid
  self.view.scoreTable.addAll([{no: "", username: usernameSelf, score: score.toFixed(0)}]);

  var rawData = database.loadData();
  var n = rawData.length;
  var sortedData = rawData;
  sortedData.sort(function(a,b) {
      return b.score - a.score; //sort descending
  });

  for (var i = 0; i < n; i++) {
    var usernameUser = sortedData[i].username;
    var scoreUser = parseInt(sortedData[i].score);
    if (usernameUser == usernameSelf) {
      self.view.scoreTable.addAll([{no: (i+1).toFixed(0), username: usernameUser, score: score.toFixed(0)}]);
      self.view.scoreTable.applyCellSkin(i+1, "no", "focus");
      self.view.scoreTable.applyCellSkin(i+1, "username", "focus");
      self.view.scoreTable.applyCellSkin(i+1, "score", "focus");
    } else {
      self.view.scoreTable.addAll([{no: (i+1).toFixed(0), username: usernameUser, score: scoreUser.toFixed(0)}]);
    }
  }
  self.view.scoreTable.height = n*70 + 75;
}

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

var previousCookie = -1;
function loadCookie() {
  var httpclient = new kony.net.HttpRequest();
  var apikey = 'AIzaSyCCeql_pQbhmb9eczMUOjWS67Q2NEyhBqE'; //google API
  var cx = '014589101908049751204:c1irh0qfjbs'; //google cx
  var q = 'cookie'; //search word
  var url = 'https://www.googleapis.com/customsearch/v1?key='+apikey+'&cx='+cx+'&q='+q+'&searchType=image';
  httpclient.open(constants.HTTP_METHOD_GET, url, false);
  
  try {
    httpclient.send();
    var response = httpclient.response;
//     alert(response.items);
    var i = -1;
    do {
    	i = Math.floor(Math.random() * 10);
    } while (i == previousCookie);
    previousCookie = i;
    kony.application.getCurrentForm().cookieIMG.src = response.items[i].link;
  } catch (err) {alert('Error while loading cookies: ' + err);}
}