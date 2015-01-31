(function() {
  'use strict'
  /* global Waypoint */
  /* eslint no-new: 0 */
  var tloaded = false
  new Waypoint({
    element: document.querySelector('#talks'),
    handler: function() {
      if (tloaded) return destroy(this)
      tloaded = true
      var script = document.createElement('script')
      script.src = 'https://js.tito.io/v1'
      document.querySelector('body').appendChild(script)
      destroy(this)
    }
  })

  var gloaded = false
  new Waypoint({
    element: document.querySelector('#about'),
    handler: function() {
      if (gloaded) return destroy(this)
      gloaded = true
      window.__loadedMap = true
      if (typeof window.__initializeMap === 'function') window.__initializeMap()
      destroy(this)
    }
  })

  function destroy (waypoint) {
    if (waypoint && (typeof waypoint.destroy === 'function')) waypoint.destroy()
  }
})()
