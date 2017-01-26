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
      var initialCOuntriesZombiePopulation = JSON.parse(JSON.stringify(countiesInitial));

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
          "0": countiesPopulations["-"]
        },
        "zombiepop": {
          "0": initialCOuntriesZombiePopulation["0"]
        }
      }
      this.countyData = countyData;

      this.data = stateData;
      //
      // var data = {};
      // for (var attrname in countyData) data[attrname] = countyData[attrname];
      // for (var attrname in stateData) data[attrname] = stateData[attrname];
      //
      //



      cb(data);
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
  }

}
