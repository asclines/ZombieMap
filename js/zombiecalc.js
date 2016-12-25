function calcApocalypse(properties, cb) {
  data = defaultZombieStateData;
    if(properties.default) {
        console.log("default!");
        cb(data);
    } else {
        console.log("not default!");
        performCalc(properties, data, function(results) {
          cb(results);
        });
    }

}

function performCalc(properties, data, cb){
  for(var i = 0; i < properties.maxIterations; i++){
    data.states[i+1] = {};
    for(var state in data.states[i]){
      data.states[i+1][state] = (i+1)*10;
    }
  }

  cb(data);

}
