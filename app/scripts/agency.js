'use strict';
/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

$(function() {
  var hash = location.hash
  if (!(/Modal$/.test(hash) || /^#talk-/.test(hash))) {
    return
  }
  $(hash).modal('show')
})

/*global DragDrop:false */
$(function(){
  if(typeof window.FileReader === 'undefined') return

  var $drag = $('.dragzone')
  $(document).on('dragover', $drag.addClass.bind($drag, 'drag'))
  $drag.on('dragover', $drag.removeClass.bind($drag, 'fa-plus'))
  $drag.on('dragleave ', $drag.addClass.bind($drag, 'fa-plus'))

  new DragDrop($drag[0], function (files) {
    var file = files.pop()
    $drag.addClass('dragged')
    var reader = new FileReader()
    reader.onload = function (event) {
      $('#newsponsor')
        .html('')
        .append($('<div>')
          .css('background-image', 'url(' + event.target.result + ')')
        )
        .show()
    }
    reader.readAsDataURL(file);
  })
})


// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var href = $(this).attr('href')
    $('html, body').stop().animate({
      scrollTop: $(href).offset().top
    }, 1500, 'easeInOutExpo')
    history.pushState({}, '', href)
    event.preventDefault()
  })
})

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
  target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  $('.navbar-toggle:visible').click()
})

window.addEventListener('updateready', window.location.reload)

if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
  window.location.reload()
}

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
      zoom: 11,
      scrollwheel: false,
      center: new google.maps.LatLng(47.761026, 13.069313)
    })

    var uni = 'University of Applied Sciences'
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(47.723379, 13.087777),
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

  google.maps.event.addDomListener(window, 'load', initialize)
})
