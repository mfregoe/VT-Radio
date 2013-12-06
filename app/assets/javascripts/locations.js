$(document).ready(function() {
  var geocoder;

  // Get user location (lat/long)

  $('#get-user-location').click(function() {
    $('#location-waiting').show();
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( success, fail );
    }
    else {
      $('#response-error').html('Sorry, your browser does not support geolocation services.');
      $('#location-waiting').hide();
      $('#location-error').show();
    }
  });

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
        $('#response-title').html('Got It!');
        $('#your-location').html('Your location is: ' + address);
        $('#location-waiting').hide();
        $('#location-next-step').show();
      } else {
        $('#response-error').html('Sorry, we couldn\'t process your address, please try again.');
        $('#location-waiting').hide();
        $('#location-error').show();
      }
    });
  }

  function fail() {
    // Could not obtain location
    $('#response-error').html('Failed to retreive your location.');
    $('#location-waiting').hide();
    $('#location-error').show();
  }

  // Get user location (zip)

  $('#submit').click(function() {
    if($('#zip-code').val().length === 0 || $('#zip-code').val().match(/[a-z]/gi) || $('#zip-code').val().match(/\s/gi) || $('#zip-code').val().length < 5 ) {
      $('#response-error').html('Invalid Zip Code.');
      $('#location-error').show();
    }
    else {
      localStorage.clear();
      var zip = $('#zip-code').val();
      localStorage.setItem('zip', zip);
      geocoder = new google.maps.Geocoder();

      geocoder.geocode( { 'address': zip}, function(data, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var address = data[0].formatted_address;
          $('#response-title').html('Got It!');
          $('#your-location').html('Your location is: ' + address);
          $('#location-next-step').show();
        } else {
          $('#response-error').html('Sorry, we couldn\'t process your address, please try again.');
          $('#location-error').show();
        }
      });
    }
  });
});