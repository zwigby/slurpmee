$(function() {
  $('#zip-submit').click(zipSubmitClick);
  $('#location-submit').click(locationSubmitClick);
});

/**
 * Occurs when the zip input submit button is clicked. Grabs the zip from the field
 * and redirects to /location/zip.
 * @param event
 */
//--------------------------------------------------------------------------------------------------
var zipSubmitClick = function(event) {
  event.preventDefault();

  var zip = $('#zip-input').val();

  window.location = '/location/' + zip;
};

/**
 * Occurs when the "find my location" button is clicked. It uses geolocation
 * service to get longitude and latitude.
 * @param event
 */
var locationSubmitClick = function(event) {

  event.preventDefault();

  if (navigator.geolocation) {
    var timeoutVal = 10 * 1000 * 1000;
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;
        window.location = '/location/' + lat + '/' + lng;
      },
      function(err) {
        console.log(err);
      },
      { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
    );
  }
  return false;
};