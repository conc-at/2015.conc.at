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

$(function() {
  $('nav.navbar').headroom()

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').bind('click', function(event) {
    var href = $(this).attr('href')
    $('html, body').stop().animate({
      scrollTop: $(href).offset().top
    }, 1500, 'easeInOutExpo')
    history.pushState({}, '', href)
    event.preventDefault()
  })

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
    target: '.navbar-fixed-top'
  })

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click()
  })
})


window.addEventListener('updateready', window.location.reload)

if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
  window.location.reload()
}
