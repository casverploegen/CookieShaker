// The general module is used to store all functions that are used for general purposes in the app, like loading
// and saving data in the local storage.


// The initVars function sets all initial values of the global variables. This is only done when there are no
// records of these variables in the local storage of the app.
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

// The loadVars function loads in all variables from the local storage of the app, if they are available. This 
// function is called every time on startup.
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

// The saveVars function stores all values of the global variables in the local storage of the app. This function
// is called every second and when the user closes the app, to make sure no data gets lost.
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

// The getUserID function is used to get the UserID of the signed in user. This value is needed for updating the
// values in the RESTdb.io database and is stored in the local storage. 
function getUserID() {
  if (kony.store.getItem("username") !== null) { // Check whether the user has already made a username, if not,
    // there also won't be a record of this user in the database and hence no UserID for this user.
    var rawData = database.loadData(); // Get all data from the database.
    var usernameSelf = kony.store.getItem("username"); // Get the username of the signed in user
    
    // Loop over all data from the database and check whether the username is in there. If a match is found, the
    // UserID will be retrieved and stored in the UserID global variable.
    for (var i = 0; i < rawData.length; i++) {
      if (rawData[i].username == usernameSelf) {
        userID = rawData[i]._id;
      }
    }
  }
}

// The updateDataGrid function updates the scoreboard (datagrid) on the scoreboard page. It retrieves all data
// from the RESTdb.io database and then loops over the data to store all values in a datagrid.
function updateDataGrid(self) {
  var usernameSelf = kony.store.getItem("username"); // Get the username of the signed in user.
  self.view.scoreTable.removeAll(); // Clear the datagrid
  // Add the score of the signed in user to the top of the list, so this is easily found.
  self.view.scoreTable.addAll([{no: "", username: usernameSelf, score: score.toFixed(0)}]);

  // Get the data from the database and sort the data based on the score of a user.
  var rawData = database.loadData();
  var sortedData = rawData;
  sortedData.sort(function(a,b) {
      return b.score - a.score; // Sort descending, so the highest scores appear on top of the scoreboard.
  });

  // Loop over all users in the database and store their username and score in the scoreboard datagrid.
  var n = sortedData.length;
  for (var i = 0; i < n; i++) {
    var usernameUser = sortedData[i].username;
    var scoreUser = parseInt(sortedData[i].score);
    // IF the username that is about to be added to the datagrid is the username of the signed in user itself,
    // the row is made bold, to be easy to find and outstanding to the user. This is done by changing the skin
    // of this row to the 'focus' skin, which I defined to be in bold text.
    if (usernameUser == usernameSelf) {
      self.view.scoreTable.addAll([{no: (i+1).toFixed(0), username: usernameUser, score: score.toFixed(0)}]);
      self.view.scoreTable.applyCellSkin(i+1, "no", "focus");
      self.view.scoreTable.applyCellSkin(i+1, "username", "focus");
      self.view.scoreTable.applyCellSkin(i+1, "score", "focus");
    } else {
      // Else, just add the rang, username and score to the datagrid.
      self.view.scoreTable.addAll([{no: (i+1).toFixed(0), username: usernameUser, score: scoreUser.toFixed(0)}]);
    }
  }
  self.view.scoreTable.height = n*70 + 75; // Increase the size of the datagrid based on the number of users.
}