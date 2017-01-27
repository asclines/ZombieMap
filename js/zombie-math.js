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
      for(var i = 0; i < zombieSim.maxTime; i++) {
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
  },

  /**
    Callback returns an object of time intervals and the status of each state/county
    at each time interval.
  **/
  launch: function(cb){
  //First setup initial zombiepop
  for (var countyCode in zombieSim.map.data.percentage["0"]) {
    if(zombieSim.utils.isState(countyCode)) continue;

    zombieSim.map.data.percentage["0"][countyCode] = new Big(zombieSim.map.data.percentage["0"][countyCode]);
    zombieSim.map.data.zombiepop["0"][countyCode] = new Big(zombieSim.map.data.zombiepop["0"][countyCode]);
    zombieSim.map.data.humanpop["0"][countyCode] = new Big(zombieSim.map.data.humanpop["0"][countyCode]);
  }

  //Then do the rest
  for(var i = 0; i < zombieSim.maxTime; i++) {
    zombieSim.map.data.percentage[i + 1] = {};
    zombieSim.map.data.zombiepop[i + 1] = {};
    zombieSim.map.data.humanpop[i + 1] = {};

    for(var county in zombieSim.map.data.percentage[i]) {
      try {
        this.calcNewZombiesInCountry(county, i, zombieSim.data.countyNeighbors[county]);

      } catch(err) {
      //  console.log(err);
      //  console.log(zombieSim.data.countyNeighbors[county]);
      }
    }
  }

  cb(zombieSim.map.data);
},

calcNewZombiesInCountry: function(countyIndex, timeIndex, neighbors) {
  var population = {
    humans: new Big(zombieSim.map.data.humanpop[timeIndex][countyIndex]),
    zombies: new Big(zombieSim.map.data.zombiepop[timeIndex][countyIndex])
  };

  var neighborPops = [];
  for (var neighborIndex in neighbors){
    var neighborCode = neighbors[neighborIndex];
    try{
      var neighbor = {
        humans: new Big(zombieSim.map.data.humanpop[timeIndex][neighborCode]),
        zombies: new Big(zombieSim.map.data.zombiepop[timeIndex][neighborCode])
      }
    } catch(err){
      console.log(err);
      console.log(neighborCode);
      console.log(zombieSim.map.data.humanpop[timeIndex][neighborCode]);
    }

    neighborPops.push(neighbor);
  }
  var results = zombieSim.model.nextIteration(population, neighborPops);
  zombieSim.map.data.zombiepop[timeIndex + 1][countyIndex] = results.zombies;
  zombieSim.map.data.humanpop[timeIndex + 1][countyIndex] = results.humans;
  zombieSim.map.data.percentage[timeIndex + 1][countyIndex] = results.percentage;

  //Now, update the state
  var zombieDelta = results.zombies - population.zombies;
  var humanDelta = results.humans - population.humans;
  var stateIndex = zombieSim.data.countyState[countyIndex];

  var newStateZombiePop = new Big(zombieDelta).plus(zombieSim.map.data.zombiepop[timeIndex +1][stateIndex]);
  zombieSim.map.data.zombiepop[timeIndex +1][stateIndex] = zombieSim.utils.bigOut(ewStateZombiePop);

  var newStateHumanPop = new Big(humanDelta).plus(zombieSim.map.data.humanpop[timeIndex+1][stateIndex]);
  zombieSim.map.data.humanpop[timeIndex+1][stateIndex] = zombieSim.utils.bigOut(newStateHumanPop);

  zombieSim.map.data.percentage[timeIndex+1][stateIndex] = zombieSim.utils.bigOut(newStateZombiePop.div(newStateHumanPop));



//TODO update the state!
}
}


zombieSim.utils = zombieSim.utils || {};

//Helper method to get the output from Big number consistent
zombieSim.utils.bigOut = function(number){
  if(number.lt(0)){
    number = number.times(0)
  }
  if (number.gt(00)){
    number = number.times(0).plus(100);
  }
  var result = number.toFixed(3);
  return result;
}

//Takes in a code and returns if code is a state or not
zombieSim.utils.isState = function(code){
  return(code.substring(0,2) == "US")
}
