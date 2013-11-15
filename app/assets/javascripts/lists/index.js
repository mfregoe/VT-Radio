$(document).ready(function() {

  if($('#data-container').length > 0) {
    // SHOW LOADING ICON ...
    var collection = undefined;
    $.ajaxSetup({ cache: false });

    // fetch json data
    $.getJSON(window.location.pathname, function(data) {
      if(data.length === 0) {
        $('#data-container').html('<div style="text-align: center;">No results found within your radius</div>');
      }
      else {
        collection = data;
        console.log(collection.length);
        //Distance Matrix can only handle 25 destinations per request
        if(collection.length >= 75) {
          getDestinationsPassFour(collection);
          getDestinationsPassThree(collection);
          getDestinationsPassTwo(collection);
          getDestinations(collection);
        } else if(collection.length >= 50) {
          getDestinationsPassThree(collection);
          getDestinationsPassTwo(collection);
          getDestinations(collection);
        } else if(collection.length >= 25) {
          getDestinationsPassTwo(collection);
          getDestinations(collection);
        } else {
          getDestinations(collection);
        }
      }
    });
  }

  // loop through collection, get all lat/long values from
  // collection
  function getDestinations(collection) {
    var destinations = (_.map(collection, function(item) {
      var latlng = new google.maps.LatLng(item.latitude,item.longitude);
      return latlng;
    })).join('|');
    checkDistance(destinations);
  }

  function getDestinationsPassTwo(collection) {
    var destinations = (_.map(collection, function(item) {
      var latlng = new google.maps.LatLng(item.latitude,item.longitude);
      return latlng;
    })).join('|');
    checkDistancePassTwo(destinations);
  }

  function getDestinationsPassThree(collection) {
    var destinations = (_.map(collection, function(item) {
      var latlng = new google.maps.LatLng(item.latitude,item.longitude);
      return latlng;
    })).join('|');
    checkDistancePassThree(destinations);
  }

  function getDestinationsPassFour(collection) {
    var destinations = (_.map(collection, function(item) {
      var latlng = new google.maps.LatLng(item.latitude,item.longitude);
      return latlng;
    })).join('|');
    checkDistancePassFour(destinations);
  }

  // function to make google map matrix call
  function checkDistance(destinations) {
    var origin = null;
    var service = new google.maps.DistanceMatrixService();
    if(localStorage.getItem('latitude') !== null && localStorage.getItem('longitude') !== null) {
      var latlngorig = new google.maps.LatLng(localStorage.getItem('latitude'),localStorage.getItem('longitude')).toString();
      var latlngarr = new Array();
      latlngarr = destinations.split('|');
      latlngdest = latlngarr.slice(0,25);

      service.getDistanceMatrix({
        origins: [latlngorig],
        destinations: latlngdest,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(data, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
          convertMetersToMiles(data.rows[0].elements);
        } else {
          $('#data-container').html('<div style="text-align: center;">There was an error processing locations.</div>');
        }
      });
    }
    else if(localStorage.getItem('zip') !== null) {
      var latlngorig = localStorage.getItem('zip');
      var latlngdest = new Array();
      latlngdest = destinations.split('|');
      latlngdest = latlngdest.slice(0,25);

      service.getDistanceMatrix({
        origins: [latlngorig],
        destinations: latlngdest,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(data, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
          convertMetersToMiles(data.rows[0].elements);
        } else {
          $('#data-container').html('<div style="text-align: center;">There was an error processing locations.</div>');
        }
      });
    }
    else {
      renderCollection();
    }
  }

  function checkDistancePassTwo(destinations) {
    var origin = null;
    var service = new google.maps.DistanceMatrixService();
    if(localStorage.getItem('latitude') !== null && localStorage.getItem('longitude') !== null) {
      var latlngorig = new google.maps.LatLng(localStorage.getItem('latitude'),localStorage.getItem('longitude')).toString();
      var latlngdest = new Array();
      latlngdest = destinations.split('|');
      latlngdest = latlngdest.slice(26,50);

      service.getDistanceMatrix({
        origins: [latlngorig],
        destinations: latlngdest,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(data, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
          convertMetersToMiles(data.rows[0].elements);
        } else {
          $('#data-container').html('<div style="text-align: center;">There was an error processing locations.</div>');
        }
      });
    }
    else if(localStorage.getItem('zip') !== null) {
      var latlngorig = localStorage.getItem('zip');
      var latlngdest = new Array();
      latlngdest = destinations.split('|');
      latlngdest = latlngdest.slice(26,50);

      service.getDistanceMatrix({
        origins: [latlngorig],
        destinations: latlngdest,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(data, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
          convertMetersToMiles(data.rows[0].elements);
        } else {
          $('#data-container').html('<div style="text-align: center;">There was an error processing locations.</div>');
        }
      });
    }
    else {
      renderCollection();
    }
  }

  function checkDistancePassThree(destinations) {
    var origin = null;
    var service = new google.maps.DistanceMatrixService();
    if(localStorage.getItem('latitude') !== null && localStorage.getItem('longitude') !== null) {
      var latlngorig = new google.maps.LatLng(localStorage.getItem('latitude'),localStorage.getItem('longitude')).toString();
      var latlngdest = new Array();
      latlngdest = destinations.split('|');
      latlngdest = latlngdest.slice(51,75);

      service.getDistanceMatrix({
        origins: [latlngorig],
        destinations: latlngdest,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(data, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
          convertMetersToMiles(data.rows[0].elements);
        } else {
          $('#data-container').html('<div style="text-align: center;">There was an error processing locations.</div>');
        }
      });
    }
    else if(localStorage.getItem('zip') !== null) {
      var latlngorig = localStorage.getItem('zip');
      var latlngdest = new Array();
      latlngdest = destinations.split('|');
      latlngdest = latlngdest.slice(51,75);

      service.getDistanceMatrix({
        origins: [latlngorig],
        destinations: latlngdest,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(data, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
          convertMetersToMiles(data.rows[0].elements);
        } else {
          $('#data-container').html('<div style="text-align: center;">There was an error processing locations.</div>');
        }
      });
    }
    else {
      renderCollection();
    }
  }

  function checkDistancePassFour(destinations) {
    var origin = null;
    var service = new google.maps.DistanceMatrixService();
    if(localStorage.getItem('latitude') !== null && localStorage.getItem('longitude') !== null) {
      var latlngorig = new google.maps.LatLng(localStorage.getItem('latitude'),localStorage.getItem('longitude')).toString();
      var latlngdest = new Array();
      latlngdest = destinations.split('|');
      latlngdest = latlngdest.slice(76,100);

      service.getDistanceMatrix({
        origins: [latlngorig],
        destinations: latlngdest,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(data, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
          convertMetersToMiles(data.rows[0].elements);
        } else {
          $('#data-container').html('<div style="text-align: center;">There was an error processing locations.</div>');
        }
      });
    }
    else if(localStorage.getItem('zip') !== null) {
      var latlngorig = localStorage.getItem('zip');
      var latlngdest = new Array();
      latlngdest = destinations.split('|');
      latlngdest = latlngdest.slice(76,100);

      service.getDistanceMatrix({
        origins: [latlngorig],
        destinations: latlngdest,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, function(data, status) {
        if (status == google.maps.DistanceMatrixStatus.OK) {
          convertMetersToMiles(data.rows[0].elements);
        } else {
          $('#data-container').html('<div style="text-align: center;">There was an error processing locations.</div>');
        }
      });
    }
    else {
      renderCollection();
    }
  }

  function convertMetersToMiles(arr) {
    _.each(arr, function(item, index) {
      filterCollection(parseInt(item.distance.value * 0.00062, 10), index);
    });
    renderCollection();
  }

  // show/hide items in collection based on band and
  // distance.
  // AM max range = 60 miles
  // FM max range = 35 miles
  function filterCollection(distance, itemIndex) {
    var band = collection[itemIndex].band;
    var name = collection[itemIndex].call_letters;
    if(band === 'AM') {
      if(distance <= 60) {
        collection[itemIndex].distance = distance;
        collection[itemIndex].show = true;
      }
      else {
        collection[itemIndex].distance = distance;
        collection[itemIndex].show = false;
      }
    }
    else if(band === 'FM') {
      if(distance <= 35) {
        collection[itemIndex].distance = distance;
        collection[itemIndex].show = true;
      }
      else {
        collection[itemIndex].distance = distance;
        collection[itemIndex].show = false;
      }
    }
  }

  // render the data collection in UI
  function renderCollection() {
    var count = 0;
    _.each(collection, function(item) {
      if(item.show) {
        count++;
        var html = '<article class="post-2178 post type-post status-publish format-standard hentry category-blog post clearfix"><figure class="post-image">';
        html += item.frequency + '</figure><div class="post-content post-station"><h1 class="post-title">';
        html += item.call_letters + ' - ' + item.name + '</h1><p class="post-meta">';
        html += item.band + ' - ' + item.city + ', ' + item.state + '</p><p>';
        html += 'Phone: ' + item.phone + '<br/>Genres: ' + item.genre + '</p></div><div class="post-social"><p class="post-meta">Share It:</p><a href="http://twitter.com/home?status='+ document.URL + '" title="Click to share this on Twitter" target="_blank"><span class="social-link-item twitter" style="margin-right:5px"></span></a><a href="https://www.facebook.com/sharer/sharer.php?u='+ document.URL + '" target="_blank" title="Click to share this on Facebook"><span class="social-link-item facebook"></span></a><p></p></div></article>';
        $('#data-container').append(html);
      }
    });

    if(count === 0) {
      $('#data-container').html('<div style="text-align: center;">No results found within your radius</div>');
    }
    else {
      window.getComputedStyle($('#data-container'));
    }
  }
});