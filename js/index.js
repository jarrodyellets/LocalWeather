$(document).ready(function() {
  var temp;

  //Get location
  $.ajax({
    type: "GET",
    url: "https://extreme-ip-lookup.com/json/",
    success: location
  });

  //Insert location into page
  function location(val) {
    $("#city").text(val.city);
    $("#country").text(val.region + ", " + val.countryCode);
    $.ajax({
      type: "GET",
      url:
        "https://api.darksky.net/forecast/b93fc5ac7b57d5f5b1e06ee54c65b41c/" +
        val.lat +
        "," +
        val.lon,
      dataType: "jsonp",
      success: weather
    });
  }

  //Insert local weather into page
  function weather(val) {
    temp = Number(val.currently.temperature);
    var now = new Date();
    var time = now.toLocaleTimeString();

    $("#conditions").text(val.currently.summary);
    $(".container").addClass(val.currently.icon);
    $("#temp").text(
      Math.round(val.currently.temperature) + String.fromCharCode(176)
    );
    $("#time").text(now.toDateString() + " | " + time);

    var skycons = new Skycons({ color: "#333" });
    skycons.set("icon", val.currently.icon);
    skycons.play();
  }

  //Button events
  $("#celsius").click(function() {
    $("#fahrenheit").removeClass("selected");
    $("#celsius").addClass("selected");
    var cTemp = Math.round((temp - 32) * 0.5556);
    $("#temp").text(cTemp + String.fromCharCode(176));
  });

  $("#fahrenheit").click(function() {
    $("#celsius").removeClass("selected");
    $("#fahrenheit").addClass("selected");
    $("#temp").text(Math.round(temp) + String.fromCharCode(176));
  });
});