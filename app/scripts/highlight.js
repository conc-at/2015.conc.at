$(function () {
  /* jshint camelcase: false */
  var today = '2015-03-07' || (new Date()).toISOString().substr(0, 10)
  function getCurrentTalks (data) {
    var nextTalks = {}
    var now = new Date()
    var compare = new Date(today)
    compare.setHours(now.getHours())
    compare.setMinutes(now.getMinutes())
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
  $.ajax('https://concat-twitterwall.herokuapp.com/schedule')
    .done(function (data) {
      console.log(getNextTalks(data))
    })
})
