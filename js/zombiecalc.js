function calcApocalypse(properties, cb) {
    if(properties.default) {
        console.log("default!");
        cb(defaultZombieStateData);
    } else {
        console.log("not default!");
        performCalc(properties, function(results) {
          cb(results);
        });
    }

}

function performCalc(properties, cb){
  console.log(properties);
  for(var i = 0; i < properties.maxIterations; i++){
    properties.data.states[i+1] = {};
    for(var state in properties.data.states[i]){
      console.log("State: " + state);
      var zombiePop = properties.data.states[i][state];
      var humanPop = 100 - zombiePop;
      console.log(zombiePop);
      var biteChance =  properties.biteChance / 100;

      var newZombiePop = zombiePop * biteChance;
      newZombiePop = (newZombiePop > humanPop ? humanPop:newZombiePop);

      var totalZombiePop = zombiePop + newZombiePop;
      console.log("\t Total before neighbor: " + totalZombiePop);

      for(var neighborIndex in stateNeighbors[state]){
        var neighborCode = stateNeighbors[state][neighborIndex];
        var neighborZombiePop = properties.data.states[i][neighborCode];
        var neighborHumanPop = 100 - neighborZombiePop;
        newZombiePop = neighborZombiePop * biteChance;
        newZombiePop = (newZombiePop > neighborHumanPop ? humanPop:newZombiePop);

        totalZombiePop+=newZombiePop;
      }
      totalZombiePop = (totalZombiePop > 100 ? 100:totalZombiePop);

    //   if(humanPop>100) humanPop = 100;
    //   if(humanPop<0) humanPop = 0;
    //
    //   var zombiePop = 100 - humanPop;
    //   if(zombiePop>100) zombiePop = 100;
    //   if(zombiePop<0) zombiePop = 0;
      properties.data.states[i+1][state] = totalZombiePop;
      console.log("NewPop: " + totalZombiePop);
    }
  }

  cb(properties.data);

}
