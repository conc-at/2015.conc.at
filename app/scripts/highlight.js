$(function () {
  $.ajax('https://concat-twitterwall.herokuapp.com/schedule')
    .done(function(data) {
      console.log(data)
    })
})
