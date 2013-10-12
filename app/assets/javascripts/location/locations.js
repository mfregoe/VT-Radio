$(document).ready(function() {
  $('#get-user-location').click(function() {
    if(navigator.geolocation) {
     navigator.geolocation.getCurrentPosition( success, fail );
    }
    else {
      alert("Sorry, your browser does not support geolocation services.");
    }
  });

  $('#submit').click(function() {
    if($('#zip-code').val().length === 0 || $('#zip-code').val().match(/[a-z]/gi) || $('#zip-code').val().match(/\s/gi) || $('#zip-code').val().length < 5) {
      alert('Invalid Zip Code.');
    }
    else {
      localStorage.clear();
      var zip = $('#zip-code').val();
      localStorage.setItem('zip', zip);
      $('#your-location').html('Your location has been found.');
      // $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&sensor=true', function(data) {
      //   var address = data.results[0].formatted_address;
      //   $('#your-location').html('Your location is: ' + address);
      // });
    }
  });

  // Get user locations (lat/long)

  //http://groups.google.com/group/google-maps-js-api-v3/browse_thread/thread/0c28ecbdb92e9e23
  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    localStorage.clear();
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
    $('#your-location').html('Your location has been found.');
    // $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&sensor=true', function(data) {
    //   var address = data.results[0].formatted_address;
    //   $('#your-location').html('Your location is: ' + address);
    // });
  }

  function fail() {
    // Could not obtain location
    alert('Failed to retreive your location.');
  }
});