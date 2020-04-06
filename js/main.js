var map = L.map('map', {
  center: [40.767, -74],
  zoom: 10
});

var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

$(document).ready(function() {

  $.ajax(Url).done(function(d) {
    allData = JSON.parse(d);

    makePage();

    $('#nextbutton').click(function() {
      pagenumber++;
      makePage();
    });

    $('#prebutton').click(function() {
      pagenumber--;
      makePage();
    });

    $('#plotbutton').click(function(){
      plotPage();
    });
  });
});
