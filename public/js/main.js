$(function() {
  $('#zip-submit').click(zipSubmitClick);
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