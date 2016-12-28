/**
File: zombie-data.js

Handles loading all data from JSON files
**/



/**
 Creates intial state data object and filles with intial data values.
 Callback returns the data
**/
function getInitialData(cb) {
  $.when(
    $.getJSON('data/zombie-initial-states.json'),
    $.getJSON('data/states-pops.json')
  ).done(function(initPercentage, initPop) {
    var newPercentage = JSON.parse(JSON.stringify(initPercentage));
    var newZombiePop = JSON.parse(JSON.stringify(initPercentage));

    data = {
      "percentage": {
        "0": newPercentage["0"]
      },
      "humanpop":{
        "0": initPop["0"]
      },
      "zombiepop":{
        "0": newZombiePop["0"]
      }
    }
    cb(data);

  });
}

/**
 Callback returns an object where the key is the ISO code of a state and the
 value is a list of ISO codes of the neighboring states.
**/
function getStateNeighbors(cb) {
  $.getJSON('data/states-neighbors.json', function(data) {
    cb(data);
  })
}
