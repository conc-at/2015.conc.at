/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

(function() {
  var header = $('.navbar-default')
  var shrinkClass = 'navbar-shrink'
  var changeHeaderOn = 140
  var didScroll = false

	function scrollPage() {
    didScroll = false
		header[($(document).scrollTop() >= changeHeaderOn ? 'add' : 'remove') + 'Class'](shrinkClass)
	}

	window.addEventListener('scroll', function(){
    if(!didScroll) {
      didScroll = true
      setTimeout(scrollPage, 250)
    }
  }, false)
})()
