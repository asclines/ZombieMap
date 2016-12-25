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
      properties.data.states[i+1][state] = (i+1)*10;
    }
  }

  cb(properties.data);

}
