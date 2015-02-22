$(function () {
  /* global $ */
  /* jshint camelcase: false */
  // 2015-03-07 for debugging
  var today = '2015-03-07' || (new Date()).toISOString().substr(0, 10)
  var rooms = ['room-110', 'lounge', 'audimax', 'room-017']

  function getCurrentTalks (data) {
    var nextTalks = {}
    var time = new Date()
    var now = new Date(today)
    // 12:01 for debugging
    now.setHours(12 || time.getHours())
    now.setMinutes(1 || time.getMinutes())
    Object.keys(data).forEach(function (room) {
      data[room][today].some(function (v) {
        var diff = new Date(v.start_time) - now

        if (diff < 0 || diff > 1000 * 60 * 60) return false

        nextTalks[room] = v
        return true
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
        el.addClass('current-' + room.toLowerCase().replace(' ', '-'))
      }
    })
    setTimeout(updateTalks.bind(null, currentTalks), 5000)
  }

  $.ajax('https://concat-twitterwall.herokuapp.com/schedule')
    .done(function (data) {
      updateTalks(getCurrentTalks(data))
    })
})
