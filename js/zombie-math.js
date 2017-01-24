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
      getStateNeighbors(function(stateNeighbors) {
        var stateNeighbors = stateNeighbors;
        if(stateNeighbors != null) {
          resolve(stateNeighbors);
        } else {
          reject(Error("Could not load state neighbors data."));
        }
      })
    }).then(function(stateNeighbors) {
      //First setup initial zombiepop using user inputted percentages
      for(var state in zombieMapData.data.percentage["0"]) {
        var humanPop = new Big(zombieMapData.data.humanpop["0"][state]);
        var zombiePop = new Big(zombieMapData.data.percentage["0"][state]).div(100).times(humanPop); // / 100) * humanPop;
        humanPop = humanPop.minus(zombiePop);
        //humanPop -= zombiePop;
        var totalPop = humanPop.plus(zombiePop);
        var realPercentage = zombiePop.div(totalPop);

        //var realPercentage = calcZombiePercentage(humanPop, zombiePop);
        zombieMapData.data.percentage["0"][state] = bigOut(realPercentage.times(100));
        zombieMapData.data.zombiepop["0"][state] = bigOut(zombiePop);
        zombieMapData.data.humanpop["0"][state] = bigOut(humanPop);
      }

      //Then do the rest
      for(var i = 0; i < zombieMapData.maxIterations; i++) {
        zombieMapData.data.percentage[i + 1] = {};
        zombieMapData.data.zombiepop[i + 1] = {};
        zombieMapData.data.humanpop[i + 1] = {};

        for(var state in zombieMapData.data.percentage[i]) {
          this.calcNewZombiesInState(state, i, stateNeighbors[state]);
        }
      }

      cb(zombieMapData.data);

    }.bind(this), function(err) {
      console.log(err);
    })
  },

  calcNewZombiesInState: function(stateIndex, timeIndex, neighbors){
    var population = {
      humans: new Big(zombieMapData.data.humanpop[timeIndex][stateIndex]),
      zombies: new Big(zombieMapData.data.zombiepop[timeIndex][stateIndex])
    };
    var neighborPops = [];
    for (var neighborIndex in neighbors){
      var neighborCode = neighbors[neighborIndex];
      var neighbor = {
        humans: new Big(zombieMapData.data.humanpop[timeIndex][neighborCode]),
        zombies: new Big(zombieMapData.data.zombiepop[timeIndex][neighborCode])
      }
      neighborPops.push(neighbor);
    }

    var results = zombieSim.model.nextIteration(population, neighborPops);
    zombieMapData.data.zombiepop[timeIndex + 1][stateIndex] = results.zombies;
    zombieMapData.data.humanpop[timeIndex + 1][stateIndex] = results.humans;
    zombieMapData.data.percentage[timeIndex + 1][stateIndex] = results.percentage;
  }
}

//Helper method to get the output from Big number consistent
function bigOut(number) {
  if(number.lt(0)){
    number = number.times(0)
  }
  var result = number.toFixed(3);
  return result;
}

function calcZombiePercentage(humanPop, zombiePop) {
  if(zombiePop == 0) return 0;
  else if(humanPop == 0) return 100;
  else return(zombiePop) / (humanPop + zombiePop) * 100;

}
