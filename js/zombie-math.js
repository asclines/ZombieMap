/**
File: zombie-math.js

Handles calculating the actual apocalypse
**/

/**
  Callback returns an object of time intervals and the status of each state
  at each time interval.
**/
function calcApocalypse(cb) {
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
    for(var i = 0; i < zombieMapData.maxIterations; i++) {
      zombieMapData.data.states[i + 1] = {};
      for(var state in zombieMapData.data.states[i]) {
        var zombiePop = zombieMapData.data.states[i][state];
        var humanPop = 100 - zombiePop;
        var biteChance = zombieMapData.biteChance / 100;
        var growthRate = zombieMapData.growthRate / 100;

        var newZombiePop = zombiePop * biteChance;
        newZombiePop = (newZombiePop > humanPop ? humanPop : newZombiePop);

        var totalZombiePop = zombiePop + newZombiePop;

        for(var neighborIndex in stateNeighbors[state]) {
          var neighborCode = stateNeighbors[state][neighborIndex];
          var neighborZombiePop = zombieMapData.data.states[i][neighborCode];
          var neighborHumanPop = 100 - neighborZombiePop;
          newZombiePop = neighborZombiePop * biteChance;
          newZombiePop = (newZombiePop > neighborHumanPop ? humanPop : newZombiePop);

          totalZombiePop += newZombiePop;
          //console.log("Something");//This log statement is used to force slower loading to test the loading bars
        }
        totalZombiePop = (totalZombiePop > 100 ? 100 : totalZombiePop);
        humanPop = 100 - totalZombiePop;
        humanPop = humanPop + humanPop * growthRate;
        humanPop = (humanPop > 100 ? 100 : humanPop);
        totalZombiePop = 100 - humanPop;

        zombieMapData.data.states[i + 1][state] = totalZombiePop;
      }
    }

    cb(zombieMapData.data);

  }, function(err) {
    console.log(err);
  })
}
