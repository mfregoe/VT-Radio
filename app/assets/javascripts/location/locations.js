$(document).ready(function() {
  var geocoder;

  $('#get-user-location').click(function() {
    if(navigator.geolocation) {
     navigator.geolocation.getCurrentPosition( success, fail );
    }
    else {
      $('#your-location').html('Sorry, your browser does not support geolocation services.');
    }
  });

  // Get user location (zip)

  $('#submit').click(function() {
    if($('#zip-code').val().length === 0 || $('#zip-code').val().match(/[a-z]/gi) || $('#zip-code').val().match(/\s/gi) || $('#zip-code').val().length < 5) {
      $('#your-location').html('Invalid Zip Code.');
    }
    else {
      localStorage.clear();
      var zip = $('#zip-code').val();
      localStorage.setItem('zip', zip);
      geocoder = new google.maps.Geocoder();

      geocoder.geocode( { 'address': zip}, function(data, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var address = data[0].formatted_address;
          $('#your-location').html('Your location is: ' + address);
          $('#location-next-step').show();
        } else {
          $('#your-location').html('Sorry, we couldn\'t process your address, please try again.');
        }
      });
    }
  });

  // Get user location (lat/long)

  function success(position) {
    geocoder = new google.maps.Geocoder();

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    localStorage.clear();
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);

    var latlng = new google.maps.LatLng(latitude,longitude);

    geocoder.geocode( { 'location': latlng}, function(data, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var address = data[0].formatted_address;
        $('#your-location').html('Your location is: ' + address);
        $('#location-next-step').show();
      } else {
        $('#your-location').html('Sorry, we couldn\'t process your address, please try again.');
      }
    });
  }

  function fail() {
    // Could not obtain location
    $('#your-location').html('Failed to retreive your location.');
  }
});