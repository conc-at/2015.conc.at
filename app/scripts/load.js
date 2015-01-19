(function() {
  'use strict';
  /*global Waypoint:false */
  var loaded = false;
  var waypoint = new Waypoint({
    element: document.querySelector('#talks'),
    handler: function() {
      if (loaded) return destroy();
      loaded = true;
      var tito = document.createElement('script');
      tito.src = 'https://js.tito.io/v1';
      document.querySelector('body').appendChild(tito)
      destroy()
    }
  });
  function destroy() {
    if (waypoint) waypoint.destroy()
  }
})();
