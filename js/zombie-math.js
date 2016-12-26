/**
File: zombie-math.js

Handles calculating the actual apocalypse
**/

/**
  Properties:
  - data: Dataset
  - biteChance
  - maxIterations

  Callback returns an object of time intervals and the status of each state
  at each time interval.
**/
function calcApocalypse(properties, cb) {
    var promise = new Promise(function(resolve, reject) {
        getStateNeighbors(function(stateNeighbors) {
            var stateNeighbors = stateNeighbors;
            if(stateNeighbors != null) {
                resolve(stateNeighbors);
            } else {
                reject(Error("Could not load state neighbors data"));
            }
        })

    }).then(function(stateNeighbors) {
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

    }, function(err) {
        console.log(err);
    })
}
