$(function () {
  /* global $ */
  /* jshint camelcase: false */
  // 2015-03-07 for debugging
  var today = '2015-03-07' || (new Date()).toISOString().substr(0, 10)
  var rooms = ['110', 'lounge', 'audimax', '017']

  function getCurrentTalks (data) {
    var nextTalks = {}
    var now = new Date()
    var compare = new Date(today)
    // 12:01 for debugging
    compare.setHours(12 || now.getHours())
    compare.setMinutes(1 || now.getMinutes())
    Object.keys(data).forEach(function (room) {
      data[room][today].some(function (v) {
        var time = new Date(v.start_time)
        if (((time - compare) / 1000 * 60 * 60) > 10) {
          nextTalks[room] = v
          return true
        }
      })
    })
    return nextTalks
  }

  function clearTalks () {
    var allEl = $('#talks a')
    rooms.forEach(function (room) {
      allEl.removeClass('current-' + room)
    })
  }

  function updateTalks (currentTalks) {
    clearTalks()
    Object.keys(currentTalks).forEach(function (room) {
      var el = $('#talks a[data-slug="' + currentTalks[room].slug + '"]')
      if (el.length > 0) {
        el.addClass('current-' + room.toLowerCase())
      }
    })
    setTimeout(updateTalks.bind(null, currentTalks), 5000)
  }

  $.ajax('https://concat-twitterwall.herokuapp.com/schedule')
    .done(function (data) {
      updateTalks(getCurrentTalks(data))
    })
})
