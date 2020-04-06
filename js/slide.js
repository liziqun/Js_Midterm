// MAP PROPERTIES
var centers = [];
centers[0] = {
  x: 40.745,
  y: -73.940,
  zoom: 11
};
centers[1] = {
  x: 40.745,
  y: -73.940,
  zoom: 12
};
centers[2] = {
  x: 40.755,
  y: -73.970,
  zoom: 14
};
centers[3] = {
  x: 40.700,
  y: -73.970,
  zoom: 14
};
centers[4] = {
  x: 40.745,
  y: -73.940,
  zoom: 12
};

// TITLE
title = [];

title[0] = "The secret of high-yield Airbnb in New York";
title[1] = 'Estimated monthly income distribution of high-yield Airbnb in NY';
title[2] = 'Average price per person for high-yield Airbnb in Manhattan';
title[3] = 'Average price per person for high-yield Airbnb in Brooklyn';
title[4] = 'Pricing Guidance Tool';

// TEXT
// First paragraph
text1 = [];

text1[0] = "This tool aims to help the Airbnb hosts to improve their revenue through reasonable pricing, based on the characteristics of those high-yield Airbnb.";
text1[1] = 'Here, we try to further explore the characteristics of those Top 5000 hith-yield Airbnbs. ';
text1[2] = 'After identifying the two regions with the highest concentration of high-yield Airbnb, we try to make some suggestion on Airbnb pricing for those who are interested in those regions.To be more specific,we visualized the average price per person for the high-yield Airbnb in Manhanttan.';
text1[3] = 'Similarly,we also visualized the average price per person for the high-yield Airbnb in Brooklyn.';
text1[4] = "Use the following options to set your own criteria and find the resonable price (per person) for a particular type of Airbnb";

// second paragraph
text2 = [];
text2[0] = "In New York, the Airbnb visitors stay on average 6.4 nights based on the official data. Besides, a review rate of 50% was chosen to convert reviews to estimated bookings based on the past experience of Airbnb company. In order to get a sense of the distribution of high-yield Airbnb in NY, we visualized the locations of top 5000 high yield Airbnb based on the following formula:  yield_per_month = Average length of stay * price * (number of reviews per mouth /review rate)."
text2[1] = "Firstly, we visualize the monthly income distribution of those high-yield Airbnbs. Obviously, those high-yield Airbnbs are mainly located in Manhattan and brooklyn.";
text2[2] = "The map on the right shows the price per person for high-yield Airbnb in Manhattan area. The circle color indicates the monthly income, and the circle size indicates the price per person of that Airbnb.";
text2[3] = "The map on the right shows the price per person for high-yield Airbnb in Brooklyn area. The circle color indicates the monthly income, and the circle size indicates the price per person of that Airbnb.";
text2[4] = '';

// FUNCTION FOR FILTERING DATA FOR EACH PAGE
// Stored in an object, each property is a function for a page.
var filterdata = {
  0: function(list) {
    var sample = [];
    _.each(list, function(obj) {
      obj['color'] = '#008080';
      sample.push(obj);
    });
    return sample;
  },
  1: function(list) {
    var sample = [];
    _.each(list, function(obj) {
      if (obj.yield > 11000) {
        obj['color'] = '#FF5A60'; //1D6A7F
        sample.push(obj)
      } else if (obj.yield  > 8400) {
        obj['color'] = '#007D8C'; //008293
        sample.push(obj);
      } else if (obj.yield > 6800) {
        obj['color'] = '#008080'; //28A4B7
        sample.push(obj);
      } else if (obj.yield > 5800) {
        obj['color'] = '#6BB7B9'; //85EAE0
        sample.push(obj);
      } else{
        obj['color'] = '#DFDFDF'; //D3FFF9
        sample.push(obj);
      };
    });
    return sample;
  },
  2: function(list) {
    var sample = [];
    _.each(list, function(obj) {
      if (obj.yield > 11000) {
        obj['color'] = '#FF5A60'; //1D6A7F
        sample.push(obj)
      } else if (obj.yield  > 8400) {
        obj['color'] = '#007D8C'; //008293
        sample.push(obj);
      } else if (obj.yield > 6800) {
        obj['color'] = '#008080'; //28A4B7
        sample.push(obj);
      } else if (obj.yield > 5800) {
        obj['color'] = '#6BB7B9'; //85EAE0
        sample.push(obj);
      } else{
        obj['color'] = '#DFDFDF'; //D3FFF9
        sample.push(obj);
      };
    });
    return sample;
  },
  3: function(list) {
    var sample = [];
    _.each(list, function(obj) {
      if (obj.yield > 11000) {
        obj['color'] = '#FF5A60'; //1D6A7F
        sample.push(obj)
      } else if (obj.yield  > 8400) {
        obj['color'] = '#007D8C'; //008293
        sample.push(obj);
      } else if (obj.yield > 6800) {
        obj['color'] = '#008080'; //28A4B7
        sample.push(obj);
      } else if (obj.yield > 5800) {
        obj['color'] = '#6BB7B9'; //85EAE0
        sample.push(obj);
      } else{
        obj['color'] = '#DFDFDF'; //D3FFF9
        sample.push(obj);
      };
    });
    return sample;
  },
  4: function(list) {
    var sample = [];
    // Used to store user's input
    var selection = {
      selectbed: $('#cbox-input1').prop('checked'),
      lowerbed: $('#lowerbed').val(),
      upperbed: $('#upperbed').val(),
      selectaccom: $('#cbox-input2').prop('checked'),
      loweraccom: $('#loweraccom').val(),
      upperaccom: $('#upperaccom').val(),
      roomtype: $('#roomtype').val(),
    };

    _.each(list, function(obj) {

      if (obj.yield > 11000) {
        obj['color'] = '#FF5A60'; //1D6A7F
      } else if (obj.yield  > 8400 && obj.yield < 11000) {
        obj['color'] = '#007D8C'; //008293
      } else if (obj.yield > 6800 && obj.yield < 8400) {
        obj['color'] = '#008080'; //28A4B7
      } else if (obj.yield > 5800 && obj.yield < 6800) {
        obj['color'] = '#6BB7B9'; //85EAE0
      } else{
        obj['color'] = '#DFDFDF'; //D3FFF9
      };

      var checks = 0;

      if (selection.selectbed == true) {
        if (obj.bedrooms >= selection.lowerbed && obj.bedrooms <= selection.upperbed) {
          checks++;
        }
      } else {
        checks++;
      }

      if (selection.selectaccom == true) {
        if (obj.accommodates >= selection.loweraccom && obj.accommodates <= selection.upperaccom) {
          checks++;
        }
      } else {
        checks++;
      }

      if (selection.roomtype == 0 && obj.room_type == 'Private room') {
        checks++;
      } else if (selection.roomtype == 1 && obj.room_type == 'Entire home/apt') {
        checks++;
      } else if (selection.roomtype == 2 && obj.room_type == 'Shared room') {
        checks++;
      } else if (selection.roomtype == 3 && obj.room_type == 'Hotel room') {
        checks++;
      }

      if (checks == 3) {
        sample.push(obj);
      }
    });
    return sample;
  },
};
