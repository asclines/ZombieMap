//This belongs in every file that adds to zombieSim namespace to prevent
//overwrting.
var zombieSim = zombieSim || {};

zombieSim.math = {
  /**
    Callback returns an object of time intervals and the status of each state
    at each time interval.
  **/
  calcApocalypse: function(cb){
    new Promise(function(resolve, reject) {
      zombieSim.data.getStateNeighbors(function(stateNeighbors) {
        var stateNeighbors = stateNeighbors;
        if(stateNeighbors != null) {
          resolve(stateNeighbors);
        } else {
          reject(Error("Could not load state neighbors data."));
        }
      })
    }).then(function(stateNeighbors) {
      //First setup initial zombiepop using user inputted percentages
      for(var state in zombieSim.map.data.percentage["0"]) {
        var humanPop = new Big(zombieSim.map.data.humanpop["0"][state]);
        var zombiePop = new Big(zombieSim.map.data.percentage["0"][state]).div(100).times(humanPop); // / 100) * humanPop;
        humanPop = humanPop.minus(zombiePop);
        //humanPop -= zombiePop;
        var totalPop = humanPop.plus(zombiePop);
        var realPercentage = zombiePop.div(totalPop);

        zombieSim.map.data.percentage["0"][state] = zombieSim.utils.bigOut(realPercentage.times(100));
        zombieSim.map.data.zombiepop["0"][state] = zombieSim.utils.bigOut(zombiePop);
        zombieSim.map.data.humanpop["0"][state] = zombieSim.utils.bigOut(humanPop);
      }

      //Then do the rest
      for(var i = 0; i < zombieMapData.maxIterations; i++) {
        zombieSim.map.data.percentage[i + 1] = {};
        zombieSim.map.data.zombiepop[i + 1] = {};
        zombieSim.map.data.humanpop[i + 1] = {};

        for(var state in zombieSim.map.data.percentage[i]) {
          this.calcNewZombiesInState(state, i, stateNeighbors[state]);
        }
      }

      cb(zombieSim.map.data);

    }.bind(this), function(err) {
      console.log(err);
    })
  },

  calcNewZombiesInState: function(stateIndex, timeIndex, neighbors){
    var population = {
      humans: new Big(zombieSim.map.data.humanpop[timeIndex][stateIndex]),
      zombies: new Big(zombieSim.map.data.zombiepop[timeIndex][stateIndex])
    };
    var neighborPops = [];
    for (var neighborIndex in neighbors){
      var neighborCode = neighbors[neighborIndex];
      var neighbor = {
        humans: new Big(zombieSim.map.data.humanpop[timeIndex][neighborCode]),
        zombies: new Big(zombieSim.map.data.zombiepop[timeIndex][neighborCode])
      }
      neighborPops.push(neighbor);
    }

    var results = zombieSim.model.nextIteration(population, neighborPops);
    zombieSim.map.data.zombiepop[timeIndex + 1][stateIndex] = results.zombies;
    zombieSim.map.data.humanpop[timeIndex + 1][stateIndex] = results.humans;
    zombieSim.map.data.percentage[timeIndex + 1][stateIndex] = results.percentage;
  }
}


zombieSim.utils = zombieSim.utils || {};

//Helper method to get the output from Big number consistent
zombieSim.utils.bigOut = function(number){
  if(number.lt(0)){
    number = number.times(0)
  }
  var result = number.toFixed(3);
  return result;
}
