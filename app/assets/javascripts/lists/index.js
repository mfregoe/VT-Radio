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
        getDestinations(collection);
      }
    });
  }

  // loop through collection, get all lat/long values from
  // collection
  function getDestinations(collection) {
    var destinations = (_.map(collection, function(item) { return item.latitude + ',' + item.longitude; })).join('|');
    checkDistance(destinations);
  }

  // function to make google map matrix call
  function checkDistance(destinations) {
    var origin = null;

    if(localStorage.getItem('latitude') !== null && localStorage.getItem('longitude') !== null) {
      origin = localStorage.getItem('latitude') + ',' + localStorage.getItem('longitude');
      // google api call
      $.getJSON('http://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + destinations + '&mode=driving&sensor=false', function(data) {
        convertMetersToMiles(data.rows[0].elements);
      });
    }
    else if(localStorage.getItem('zip') !== null) {
      origin = localStorage.getItem('zip');
      // google api call
      $.getJSON('http://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + destinations + '&mode=driving&sensor=false', function(data) {
        convertMetersToMiles(data.rows[0].elements);
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
      if(item.show || item.show === undefined) {
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