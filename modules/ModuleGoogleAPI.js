// The GoogleAPI module is used to store all functions that are needed to use the GoogleAPI. The API is used to
// get images of cookies that are available on the internet (through google image search), those will be randomly
// chosen and displayed on the main/home screen of the app.


// Remeber which cookie image was previously displayed, so there won't be 2 of the same in a row.
var previousCookie = -1;
function loadCookie() {
  // Set up the HTTP request
  var httpclient = new kony.net.HttpRequest();
  var apikey = 'AIzaSyCCeql_pQbhmb9eczMUOjWS67Q2NEyhBqE'; // Google API key
  var cx = '014589101908049751204:c1irh0qfjbs'; // Google cx
  var q = 'cookie'; // Search phrase
  var url = 'https://www.googleapis.com/customsearch/v1?key='+apikey+'&cx='+cx+'&q='+q+'&searchType=image';
  httpclient.open(constants.HTTP_METHOD_GET, url, false); // Use a GET request to get the links of the images.
  
  try {
    httpclient.send(); // Send the request.
    var response = httpclient.response; // Store the response
    // Generate a random value between 0 and 9 that isn't the same as the previous one, this value is used to 
    // choose one of the pictures.
    var i = -1;
    do {
    	i = Math.floor(Math.random() * 10);
    } while (i == previousCookie);
    previousCookie = i;
    kony.application.getCurrentForm().cookieIMG.src = response.items[i].link; // Update the image on the home page.
  } catch (err) {alert('Error while loading cookies: ' + err);} // Show an alert if something went wrong.
}