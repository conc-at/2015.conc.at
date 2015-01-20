(function() {
  'use strict';
  /*global Waypoint:false */
  var tloaded = false;
  var tito = new Waypoint({
    element: document.querySelector('#talks'),
    handler: function() {
      if (tloaded) return destroy(tito);
      tloaded = true;
      var script = document.createElement('script');
      script.src = 'https://js.tito.io/v1';
      document.querySelector('body').appendChild(script)
      destroy(tito)
    }
  });

  var gloaded = false;
  var google = new Waypoint({
    element: document.querySelector('#about'),
    handler: function() {
      if (gloaded) return destroy(google);
      gloaded = true;
      window.initializeMap();
      destroy(google);
    }
  });

  function destroy(waypoint) {
    if (waypoint) waypoint.destroy()
  }
})();
