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
  for(var i = 0; i < properties.maxIterations; i++){
    properties.data.states[i+1] = {};
    for(var state in properties.data.states[i]){
      console.log("State: " + state);
      var newPop = properties.data.states[i][state];
      for(var neighborIndex in stateNeighbors[state]){
        var neighborCode = stateNeighbors[state][neighborIndex];
        newPop += properties.data.states[i][neighborCode];
      }
      newPop = newPop%101;
      properties.data.states[i+1][state] = newPop;
      console.log("NewPop: " + newPop);
    }
  }

  cb(properties.data);

}
