//This belongs in every file that adds to zombieSim namespace to prevent
//overwrting.
var zombieSim = zombieSim || {};

zombieSim.data = {
  /**
   Creates intial state data object and filles with intial data values.
   Callback returns the data
  **/
  getInitialData: function(cb){
    $.when(
      $.getJSON('data/states-initial.json'),
      $.getJSON('data/states-pops.json'),
      $.getJSON('data/county-adjacent.json'),
      $.getJSON('data/county-state.json'),
      $.getJSON('data/county-population.json'),
      $.getJSON('data/county-initial.json')
    ).done(function(
      statesInitial,
      statesPopulation,
      countiesAdjacents,
      countiesStates,
      countiesPopulations,
      countiesInitial
    ) {
      var initialStatePercentage = JSON.parse(JSON.stringify(statesInitial));
      var initialStatesZombiePopulation = JSON.parse(JSON.stringify(statesInitial));
      var initialCountiesPercentage = JSON.parse(JSON.stringify(countiesInitial));
      var initialCountriesZombiePopulation = JSON.parse(JSON.stringify(countiesInitial));

      zombieSim.data.countyNeighbors = countiesAdjacents["0"];
      zombieSim.data.countyState = countiesStates["0"];

      var stateData = {
        "percentage": {
          "0": initialStatePercentage["0"]
        },
        "humanpop": {
          "0": statesPopulation["0"]
        },
        "zombiepop": {
          "0": initialStatesZombiePopulation["0"]
        }
      }
      this.stateData = stateData;

      var countyData = {
        "percentage": {
          "0": initialCountiesPercentage["0"]
        },
        "humanpop": {
          "0": countiesPopulations["0"]
        },
        "zombiepop": {
          "0": initialCountriesZombiePopulation["0"]
        }
      }
      this.countyData = countyData;



      var data = {
        "percentage": {
          "0": zombieSim.utils.mergeObjects(
            initialStatePercentage["0"],
            initialCountiesPercentage["0"]
          )
        },
        "humanpop": {
          "0": zombieSim.utils.mergeObjects(
            statesPopulation["0"],
            countiesPopulations["0"]
          )
        },
        "zombiepop": {
          "0": zombieSim.utils.mergeObjects(
            initialStatesZombiePopulation["0"],
            initialCountriesZombiePopulation["0"]
          )
        }
      };

      zombieSim.map.data = data;

      cb();
    });
  },

  /**
   Callback returns an object where the key is the ISO code of a state and the
   value is a list of ISO codes of the neighboring states.
  **/
  getStateNeighbors: function(cb){
    $.getJSON('data/states-neighbors.json', function(data) {
      cb(data);
    })
  },

  getCountyNeighbors: function(cb){
    $.getJSON('data/counties-adjacents.json', function(data) {
      cb(data);
    });
  }

}


zombieSim.utils = zombieSim.utils || {};
zombieSim.utils.mergeObjects = function(obj1, obj2){
  var obj3 = {};
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
}
