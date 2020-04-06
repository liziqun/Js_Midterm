
// VARIABLES
var pagenumber = 0; // start with 0;
var Url = "https://raw.githubusercontent.com/liziqun/Js_Midterm/master/data/Airbnb_high.json";
var allData; // For storing all data;
var pageData; // For storing data to be made into markers;
var myMarkers; // For storing markers.

// FUNCTIONS

// Clear the map
var resetMap = function() {
  _.forEach(myMarkers, function(obj) {
    map.removeLayer(obj);
  });
  myMarkers = [];
  $('#tip').show();
};

// Generate the info you see in the box
var generateinfo = function(data) {
  var info = {
    name:data.name,
    neighbourhood: data.neighbourhood,
    roomtype:data.room_type,
    price_per_person:Math.round(data.price_per_person) + "$/person",
    bedrooms:data.bedrooms,
    accommodates:data.accommodates,
    price:data.price + "$/night",
    revenue:"Monthly Yield : "+ Math.round(data.yield) +"$/month"
  };
  return info;
};

// Display the stored info in the table area
var displaytable = function(obj) {
  $('#tip').hide();
  $('#detail').show();

  $('#revenue').text(obj.revenue);
  $('#description').text(obj.description);

  $('#name').text(obj.name);
  $('#price').text(obj.price);
  $('#price_per_person').text(obj.price_per_person);
  $('#room_type').text(obj.roomtype);
  $('#bedrooms').text(obj.bedrooms);
  $('#accommodates').text(obj.accommodates);
  $('#neighbourhood').text(obj.neighbourhood);
};

// Make the point markers
var makeMarkers = function(list) {
  var markerlist = [];
  _.each(list, function(obj) {
    var marker = L.circleMarker([obj.latitude, obj.longitude], {
      radius: 1,
      color: obj.color,
      opacity:0.6
    });
    marker['detail'] = generateinfo(obj);
    markerlist.push(marker);
  });
  return markerlist;
};

var makeMarkers_circle = function(list) {
  var markerlist = [];
  _.each(list, function(obj) {
    var marker = L.circleMarker([obj.latitude, obj.longitude], {
      radius: obj.price_per_person/15,
      color: obj.color,
      weight:0,
      fillOpacity:0.3
    });

    marker['detail'] = generateinfo(obj);
    markerlist.push(marker);
  });
  return markerlist;
};

// Add markers to map
var plotMarkers = function(list) {
  _.each(list, function(marker) {
    marker.addTo(map);
    });
};

var plotMarkers_detail = function(list) {
  _.each(list, function(marker) {
    marker.addTo(map).on('click', function(e) {
      displaytable(this.detail);
    });
  });
};

// Change the texts on the page on page switch
var changetext = function(pagenumber) {
  $('#text1').text(text1[pagenumber]);
  $('#text2').text(text2[pagenumber]);
  $('#title').text(title[pagenumber]);

  if (pagenumber == 0 ) {
    $('#prebutton').hide();
    $('#nextbutton').show();
    $('#inputs').hide();
    $('#tip').hide();
    $('#legend').hide();
  } else if (pagenumber == 1) {
    $('#prebutton').show();
    $('#nextbutton').show();
    $('#tip').hide();
    $('#inputs').hide();
    $('#legend').show();
    $('#tip_person').hide();
  } else if (pagenumber == 4) {
    $('#prebutton').show();
    $('#nextbutton').hide();
    $('#tip').hide();
    $('#inputs').show();
    $('#tip_person').hide();
  } else {
    $('#prebutton').show();
    $('#nextbutton').show();
    $('#inputs').hide();
    $('#legend').show();
    $('#numberofresults').text();
  };
};

// Generates the page
var makePage = function() {
  if (pagenumber ==0 || pagenumber ==1) { // if not last page
    resetMap(); // Clears previous map.
    changetext(pagenumber); // Changes text.
    pageData = filterdata[pagenumber](allData); // Filter data applicable for this page.
    myMarkers = makeMarkers(pageData); // Generate markers.
    plotMarkers(myMarkers); // Plot those markers.
    map.setView([centers[pagenumber].x, centers[pagenumber].y], centers[pagenumber].zoom); // Change map zoom and center.
    $('#detail').hide();
  } else if (pagenumber ==2 || pagenumber ==3) { // if not last page
    resetMap(); // Clears previous map.
    changetext(pagenumber); // Changes text.
    pageData = filterdata[pagenumber](allData); // Filter data applicable for this page.
    myMarkers = makeMarkers_circle(pageData); // Generate markers.
    plotMarkers_detail(myMarkers); // Plot those markers.
    map.setView([centers[pagenumber].x, centers[pagenumber].y], centers[pagenumber].zoom); // Change map zoom and center.
    $('#detail').hide();
  } else {
    resetMap();
    changetext(pagenumber);
    map.setView([centers[pagenumber].x, centers[pagenumber].y], centers[pagenumber].zoom);
    $('#detail').hide();
    $('#tip').hide();
  }
};

// Generates the last plot page
var plotPage = function() { // just for last page
  resetMap();
  pageData = filterdata[4](allData);
  myMarkers = makeMarkers_circle(pageData); // Generate markers.
  plotMarkers_detail(myMarkers); // Plot those markers.
  map.setView([centers[pagenumber].x, centers[pagenumber].y], centers[pagenumber].zoom); // Change map zoom and center.
  $('#numberofresults').text(pageData.length);
  $('#avgprice').text(avg(pageData));
  $('#detail').hide();
  $('#tip').hide();
}
