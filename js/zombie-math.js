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
        calcNewZombiesInState(state, i, stateNeighbors[state]);
      }
    }

    cb(zombieMapData.data);

  }, function(err) {
    console.log(err);
  })
}


function calcNewZombiesInState(stateIndex, timeIndex, neighbors) {
  var zombiePop = new Big(zombieMapData.data.zombiepop[timeIndex][stateIndex]);
  var humanPop = new Big(zombieMapData.data.humanpop[timeIndex][stateIndex]);
  var biteChance = zombieMapData.biteChance / 100;
  var growthRate = zombieMapData.growthRate / 100;

  var newZombiePop = new Big(0);
  if(humanPop.gt(0)){
    newZombiePop = zombiePop.times(biteChance);
  }

  for(var neighborIndex in neighbors) {
    var neighborCode = neighbors[neighborIndex];
    var neighborZombiePop = new Big(zombieMapData.data.zombiepop[timeIndex][neighborCode]);
    var borderChance = Math.random(); //Chance disease crosses border.
    if(humanPop.gt(0)){
      var newestZobmies = neighborZombiePop.times(biteChance);
      newZombiePop = newZombiePop.plus(newestZobmies);
    }
  }

  var newHumanPop = new Big(humanPop).times(growthRate);
  var totalHumanPop = new Big(humanPop).minus(newZombiePop).plus(newHumanPop);
  var totalZombiePop = new Big(zombiePop).plus(newZombiePop);
  var sumPop = new Big(totalHumanPop).plus(totalZombiePop);
  var zombieTakeoverPercentage = new Big(totalZombiePop).div(sumPop);

  //var zombieTakeoverPercentage = calcZombiePercentage(totalHumanPop, totalZombiePop);
  // 
  // if(stateIndex == "US-TX") {
  //   console.log("State[" + stateIndex + "] at time[" + timeIndex + "] with" +
  //     "\n newZombiePop = " + bigOut(newZombiePop) +
  //     "\n newHumanPop = " + bigOut(newHumanPop) +
  //     "\n zombieTakeoverPercentage = " + bigOut(zombieTakeoverPercentage));
  // }



  zombieMapData.data.zombiepop[timeIndex + 1][stateIndex] = bigOut(totalZombiePop);
  zombieMapData.data.humanpop[timeIndex + 1][stateIndex] = bigOut(totalHumanPop);
  zombieMapData.data.percentage[timeIndex + 1][stateIndex] = bigOut(zombieTakeoverPercentage.times(100));
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
