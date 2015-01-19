// Map
/*global google:false */
$(function() {
  var map
  if (!google) {
    return
  }
  var $map = $('#map').show()

  var setScroll = function(option) {
    if (!map) {
      return
    }
    map.setOptions({scrollwheel: option})
  }

  var initialize = function() {
    map = new google.maps.Map($map[0], {
      zoom: 3,
      scrollwheel: false,
      center: new google.maps.LatLng(47.761026, 13.069313)
    })

    var sbg = new google.maps.LatLng(47.723379, 13.087777)

    var uni = 'University of Applied Sciences'
    var marker = new google.maps.Marker({
      position: sbg,
      map: map,
      title: uni
    })

    var infowindow = new google.maps.InfoWindow({
      content: '<h2 class="section-heading">Our amazing venue</h2>' +
        '<h3 class="section-subheading text-muted">' +
          uni +
          ' <a href="https://www.google.com/maps/place/Fachhochschule+Salzburg/" title="Open in Google Maps">' +
            '<i class="fa fa-external-link"></i>' +
          '</a>' +
        '</h3>'
    })

    infowindow.open(map, marker)

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker)
    })

    google.maps.event.addListener(map, 'mousedown', function() {
      setScroll(true)
    })

    var flights = [
      {
        path: [
          // SFO
          new google.maps.LatLng(37.7833, -122.4167),
          sbg
        ],
        quantity: 2 //3 //4
      }, {
        path: [
          // Austin
          new google.maps.LatLng(30.2500, -97.7500),
          sbg
        ]
      }, {
        path: [
          // Chicago
          new google.maps.LatLng(41.8369, -87.6847),
          sbg
        ]
      }, {
        path: [
          // Melbourne
          new google.maps.LatLng(-37.8136, 144.9631),
          sbg
        ]
      }, {
        path: [
          // Krakow
          new google.maps.LatLng(50.0614, 19.9372),
          sbg
        ]
      // }, {
      //   path: [
      //     // Zurich
      //     new google.maps.LatLng(47.3667, 8.5500),
      //     sbg
      //   ]
      }, {
        path: [
          // Vienna
          new google.maps.LatLng(48.2000, 16.3667),
          sbg
        ]
      }, {
        path: [
          // Munich
          new google.maps.LatLng(48.1333, 11.5667),
          sbg
        ],
        quantity: 1 //2
      }, {
        path: [
          // Düsseldorf
          new google.maps.LatLng(51.2333, 6.7833),
          sbg
        ]
      }, {
        path: [
          // Cologne
          new google.maps.LatLng(50.9364, 6.9528),
          sbg
        ]
      }, {
        path: [
          // Berlin
          new google.maps.LatLng(52.5167, 13.3833),
          sbg
        ],
        quantity: 2 //4
      // }, {
      //   path: [
      //     // London
      //     new google.maps.LatLng(51.5072, -0.1275),
      //     sbg
      //   ],
      //   quantity: 1
      // }, {
      //   path: [
      //     // San Jose, CR
      //     new google.maps.LatLng(9.6000, -83.9500),
      //     sbg
      //   ],
      //   quantity: 1
      }
    ]

    flights.forEach(function(flight) {
      var flightPath = new google.maps.Polyline({
        path: flight.path,
        geodesic: true,
        strokeColor: '#c50202',
        strokeOpacity: 1.0,
        strokeWeight: (flight.quantity || 1) * 2
      });

      flightPath.setMap(map);
    })
  }

  $('body').on('mousedown', function(event) {
    var insideMap = $(event.target).parents('#map').length > 0

    if(!insideMap) {
      setScroll(false)
    }
  })

  $(window).scroll(function() {
    setScroll(false)
  })

  initialize()
})
