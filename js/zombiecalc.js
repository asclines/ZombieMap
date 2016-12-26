function calcApocalypse(properties, cb) {
    if(properties.default) {
      getInitialData(function(data){
        cb(data)
      })
    } else {
        performCalc(properties, function(results) {
            cb(results);
        });
    }

}

function performCalc(properties, cb) {
    for(var i = 0; i < properties.maxIterations; i++) {
        properties.data.states[i + 1] = {};
        for(var state in properties.data.states[i]) {
            var zombiePop = properties.data.states[i][state];
            var humanPop = 100 - zombiePop;
            var biteChance = properties.biteChance / 100;

            var newZombiePop = zombiePop * biteChance;
            newZombiePop = (newZombiePop > humanPop ? humanPop : newZombiePop);

            var totalZombiePop = zombiePop + newZombiePop;

            for(var neighborIndex in stateNeighbors[state]) {
                var neighborCode = stateNeighbors[state][neighborIndex];
                var neighborZombiePop = properties.data.states[i][neighborCode];
                var neighborHumanPop = 100 - neighborZombiePop;
                newZombiePop = neighborZombiePop * biteChance;
                newZombiePop = (newZombiePop > neighborHumanPop ? humanPop : newZombiePop);

                totalZombiePop += newZombiePop;
                //console.log("Something");//This log statement is used to force slower loading to test the loading bars
            }
            totalZombiePop = (totalZombiePop > 100 ? 100 : totalZombiePop);

            properties.data.states[i + 1][state] = totalZombiePop;
        }
    }

    cb(properties.data);

}
