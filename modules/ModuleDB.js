// The database module is written as a module that is closed of from the rest of the app, through making use
// of a special function syntax, as can be seen below. This way, the variables and function used in this
// module aren't visible outside the module, which avoids conflicts.
// Function of this modules are used in the following way:   database.functionName();


(function(database) {
  // Declare the module variables, which are the RESTdb.io database values that keep coming back.
  var DBname = 'cookieclicker-2bb0';
  var DBtable = 'cookies';
  var DBapikey = 'f16ade3ec4f0a1d0523a5d28eb6c28df2c014';

  // The loadData function uses a GET request to get all data that is available in the cookies table of my
  // RESTdb.io database. This data is then returned by the function to be used elsewhere.
  database.loadData = function() {
    // Set up the HTTP request.
    var httpclient = new kony.net.HttpRequest();
    httpclient.open(constants.HTTP_METHOD_GET, 'https://'+DBname+'.restdb.io/rest/'+DBtable, false);
    httpclient.setRequestHeader('x-apikey', DBapikey);
    try {
      httpclient.send(); // Send the request.
      return httpclient.response; // Return the response of the request.
    } catch (err) {alert('Error while loading data: ' + err);} // Show an alert if something went wrong.
  };

  // The deleteData function uses a POST request to tell the proxy server what data to delete in the cookie table.
  // This proxy server then sends a DELETE request to RESTdb.io. This workaround is needed since Kony only
  // supports GET and POST http requests.
  database.deleteData = function(targetUsername) {
    // Set up specific variables for deleting data.
    var qKey ='username';
    var qVal = targetUsername;
	
    // Set up the HTTP request.
    var httpclient = new kony.net.HttpRequest();
    var url ='http://vjkhan.com/restdb/del.php?db='+DBname+'&table='+DBtable+'&apikey='+DBapikey+'&qKey='+qKey+'&qVal='+qVal;
    httpclient.open(constants.HTTP_METHOD_POST, url);
    try {
      httpclient.send(); // Send the request.
    } catch (err) {alert('Error while deleting data: ' + err);} // Show an alert if something went wrong.
  };

  // The insertData function uses a POST request to send data that should be inserted in the cookie table in
  // my RESTdb.io database. The function parameters are used to specify the values.
  database.insertData = function(saveUsername, saveScore){
    // Set up the HTTP request.
    var httpclient = new kony.net.HttpRequest();
    httpclient.open(constants.HTTP_METHOD_POST, 'https://'+DBname+'.restdb.io/rest/'+DBtable);
    httpclient.setRequestHeader('x-apikey', DBapikey);
    httpclient.setRequestHeader("Content-Type", "application/json");
    try {
      // Specify what the new values in the table should be.
      var postData = {
        "username": saveUsername,
        "score": saveScore,
      };
      httpclient.send(postData); // Send the request.
    } catch(err) {alert('Error while inserting data: ' + err);} // Show an alert if something went wrong.
  };

  // The updateData function uses a POST request to tell my proxy server what data to update in the cookie table
  // and what the new values should be. This proxy server then sends a PUT request to RESTdb.io. This workaround
  // is needed since Kony only supports GET and POST http requests.
  database.updateData = function(targetID, saveScore) {
	// Set up the HTTP request.
    var httpclient = new kony.net.HttpRequest();
    var url ='http://cookies.casverploegen.nl/update.php?db='+DBname+'&table='+DBtable+'&apikey='+DBapikey+'&id='+targetID+'&score='+saveScore;
    httpclient.open(constants.HTTP_METHOD_POST, url);
    try {
      httpclient.send(); // Send the request.
    } catch (err) {alert('Error while updating data: ' + err);} // Show an alert if something went wrong.
  };
})(this.database = {}); // End of the module.