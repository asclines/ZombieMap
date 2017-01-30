log.setLevel('debug'); //See https://github.com/pimterry/loglevel for more

zombies = {
  inProgress: false, //Various parts of the elements in this site depend on this fact.
  currentTime: 0,
  init: function() {
    log.debug("Initializing zombies")
    new Promise(zombies.getInitialData).then(function() {
      log.debug("Done getting initial data")
      zombies.setupMap(function() {
        zombieModel.setup();
      })
    }, function(reason) {
      log.error(reason)
    });


    $('#calculateSubmit').click(zombies.onLaunchClick);
    $('#calculateReset').click(zombies.onResetClick);

  },
  /*
  MAP HANDLING
  */
  setupMap: function(done) {
    log.debug("Setting up map")
    zombies.currentTime = 0;
    zombies.mapObject = new jvm.Map({
      container: $('#map'),
      map: 'us_aea',
      backgroundColor: "transparent",
      onRegionTipShow: zombies.onRegionTipShow,
      onRegionClick: zombies.onRegionClick,
      series: {
        regions: [{
          scale: ['#99ff99', '#990000'],
          attribute: 'fill',
          values: zombies.percentages[zombies.currentTime],
          min: 0,
          max: 100,
          legend: {
            horizontal: true,
            title: 'Percentage taken over by zombies'
          }
          }]
      }
    });

    done();
  }, //End - setupMap

  onRegionTipShow: function(event, label, code) {
    //log.debug("onRegionTipShow", label, code)
    zombies.currentLabel = label;
    zombies.currentHoverState = label.html();
    try {
      if(zombies.inProgress) {
        label.html(
          '<b>' + label.html() + '</b></br>' +
          '<b>Zombie takeover: </b>' + zombies.percentages[zombies.currentTime][code] + '% </b></br>' +
          '<b>Human Population: </b>' + Number(zombies.populations[zombies.currentTime][code].humans).toLocaleString() + '</b></br>' +
          '<b>Zombie Population: </b>' + Number(zombies.populations[zombies.currentTime][code].zombies).toLocaleString()
        );
      } else {
        label.html(
          '<b>' + label.html() + '</b></br>' +
          '<b>Population: </b>' + Number(zombies.populations[zombies.currentTime][code].humans).toLocaleString() + '</b></br>' +
          '<b>Initial Zombies: </b>' + zombies.populations[zombies.currentTime][code].zombies
        );
      }
    } catch(err) {
      //Thrown when missing data at code
      //log.error(err);
    }

  },


  //NOTE: Assumes code is a state code for now.
  onRegionClick: function(event, code) {
    if(zombies.inProgress) return;
    //Iterate through each county add 100 zombies to each county
    var counties = zombies.statesCounties[code];
    var stateHumanPop = 0;
    var stateZombiePop = 0;
    counties.forEach(function(countyCode) {
      var pop = zombies.populations["0"][countyCode];
      var humanPop = pop.humans;
      var zombiePop = pop.zombies;

      if(humanPop > 100) {
        humanPop = humanPop - 100;
        zombiePop = zombiePop + 100;
        zombies.percentages["0"][countyCode] = zombies.roundNumber((zombiePop / (humanPop + zombiePop) * 100));
      } else {
        zombiePop = zombiePop + humanPop;
        humanPop = 0;
        zombies.percentages["0"][countyCode] = 0;
      }

      zombies.populations["0"][countyCode].humans = humanPop;
      zombies.populations["0"][countyCode].zombies = zombiePop;
      stateHumanPop+=humanPop;
      stateZombiePop+=zombiePop;

    });

    zombies.populations["0"][code].humans = stateHumanPop;
    zombies.populations["0"][code].zombies = stateZombiePop;
    zombies.percentages["0"][code] = zombies.roundNumber((stateZombiePop / (stateHumanPop + stateZombiePop) * 100));



    zombies.currentLabel.html(
      '<b>' + zombies.currentHoverState + '</b></br>' +
      '<b>Population: </b>' + Number(zombies.populations[zombies.currentTime][code].humans).toLocaleString() + '</b></br>' +
      '<b>Initial Zombies: </b>' + zombies.populations[zombies.currentTime][code].zombies
    );

  },

  /*
  CONTROLS HANDLING
  */
  onLaunchClick: function() {
    log.debug("Launching");
    zombies.inProgress = true;
    document.getElementById('calculateSubmit').style.display = 'none';
    $("#map").addClass('loading');

    zombies.maxTime = document.getElementById('timeMax').value;
    new Promise(zombies.calculateSimulation).then(zombies.showSimulation);

  },

  onResetClick: function() {
    log.debug("Resetting");
    zombies.inProgress = false;
    zombies.currentTime = 0;
    document.getElementById('calculateSubmit').style.display = 'block'
    document.getElementById('div-runtime').style.display = 'none'
    document.getElementById('curTimeValue').innerHTML = zombies.currentTime;
    zombies.init();
  },

  showSimulation: function() {
    log.debug("Start simulation")
    $("#map").removeClass('loading')
    document.getElementById('div-runtime').style.display = 'block';
    $("#slider-simulator").slider({
      value: zombies.currentTime,
      min: 0,
      max: document.getElementById('timeMax').value,
      step: 1,
      slide: zombies.onSimulatorSlider
    });

  },

  onSimulatorSlider: function(event, ui) {
    log.debug("Sliding simulator:", ui)
    log.debug(zombies.mapObject)
    zombies.currentTime = ui.value;
    document.getElementById('curTimeValue').innerHTML = ui.value;
    zombies.mapObject.series.regions[0].setValues(zombies.percentages[ui.value])
    log.debug(zombies.percentages[ui.value])

  },




  /*
  MATH HANDLING
  */
  calculateSimulation: function(resolve) {
    zombies.methodEntry();
    log.info("Calculating Simulation");
    //First: Create all the space needed.
    for(var i = 0; i < zombies.maxTime; i++) {
      zombies.percentages[i + 1] = {};
      zombies.populations[i + 1] = {};
      for(var stateCode in zombies.statesCounties) {
        // log.debug("For time", i, "allocating space for state code", stateCode);
        zombies.populations[i + 1][stateCode] = {}
        zombies.populations[i + 1][stateCode] = {}
        var counties = zombies.statesCounties[stateCode];
        counties.forEach(function(countyCode) {
          // log.debug("For time", i, "allocating space for county code", countyCode);
          zombies.populations[i + 1][countyCode] = {};
        })
      }
    }



    zombies.calcAllStatesNextIteration(0, function() {
      resolve();
    });
    zombies.methodExit();
  },

  calcAllStatesNextIteration: function(timeIndex, done) {
    zombies.methodEntry();
    log.debug("Calculating all states for time: ", timeIndex);
    if(timeIndex >= zombies.maxTime) {
      log.debug("Reached maxtime: ", zombies.maxTime)
      done();
      return;
    }





    // zombies.percentages[timeIndex + 1] = {};
    // zombies.populations[timeIndex + 1] = {};
    var statesPromises = [];
    for(var stateCode in zombies.statesCounties) {
      // zombies.populations[timeIndex + 1][stateCode] = {}
      // zombies.populations[timeIndex + 1][stateCode] = {}

      var deferred = Q.defer();
      zombies.calculateStateNextIteration(
        stateCode, timeIndex,
        function(val) {
          deferred.resolve(val);
        }
      )
      statesPromises.push(deferred.promise);
    }
    Q.all(statesPromises).then(function(prevTime) {
      //log.debug("Iteration ", timeIndex, " done")
      timeIndex++;
      zombies.calcAllStatesNextIteration(timeIndex, done);
    })
    zombies.methodExit();
  },

  calculateStateNextIteration: function(stateCode, timeIndex, resolve) {
    zombies.methodEntry();
    log.debug("Calculating timeIndex", timeIndex, "for state", stateCode);


    var counties = zombies.statesCounties[stateCode];
    var nextHumanPop = 0;
    var nextZombiePop = 0;

    counties.forEach(function(countyCode) {
      // zombies.populations[timeIndex + 1][countyCode] = {};
      var countyPop = zombies.populations[timeIndex][countyCode]
      var countyNeighborPops = []


      try {
        zombies.countyNeighbors[countyCode].forEach(function(neighborCode) {
          log.debug("For countyCode", countyCode, "adding neighborCode", neighborCode)
          countyNeighborPops.push(zombies.populations[timeIndex][neighborCode])
        })
      } catch(e) {
        log.warn("calculateStateNextIteration", e, " countyCode: ", countyCode)
      } finally {
        results = zombieModel.nextIteration(countyPop, countyNeighborPops);
        log.debug("Results for countyCode", countyCode, "at time", timeIndex, ":", results)
        zombies.populations[timeIndex + 1][countyCode].humans = results.humans;
        zombies.populations[timeIndex + 1][countyCode].zombies = results.zombies;

        if(results.humans > 0 && timeIndex >= 1) {
          log.debug("greaterReults", results)
        }
        nextHumanPop += results.humans;
        nextZombiePop += results.zombies;
      }

    })
    var nextPercentage = zombies.zombiePercentage(nextZombiePop, nextHumanPop);
    log.debug("nextPercentage", nextPercentage)


    nextHumanPop = zombies.roundNumber(nextHumanPop);
    nextZombiePop = zombies.roundNumber(nextZombiePop);

    zombies.populations[timeIndex + 1][stateCode].humans = ((nextHumanPop < 0) ? 0 : nextHumanPop);
    zombies.populations[timeIndex + 1][stateCode].zombies = ((nextZombiePop < 0) ? 0 : nextZombiePop);


    // var nextPercentage = 0;
    // if(nextZombiePop > 0) {
    //   nextPercentage = (nextZombiePop / (nextHumanPop + nextZombiePop)) * 100
    //   nextPercentage = zombies.roundNumber(nextPercentage)
    //   nextPercentage = ((nextPercentage > 100) ? 100 : nextPercentage)
    // }




    zombies.percentages[timeIndex + 1][stateCode] = nextPercentage
    log.debug("Percentage at stateCode", stateCode, "at time", timeIndex + 1, "is", nextPercentage)
    log.debug("Human population at stateCode", stateCode, "at time", timeIndex + 1, "is", nextHumanPop)
    log.debug("Zombie population at stateCode", stateCode, "at time", timeIndex + 1, "is", nextZombiePop)

    resolve(timeIndex);

    zombies.methodExit();
  },





  /*
  DATA HANDLING
  */
  getInitialData: function(resolve, reject) {
    zombies.methodEntry();
    log.info("Loading data files")
    $.when(
      $.getJSON('data/percentages.json'),
      $.getJSON('data/populations.test.json'),
      $.getJSON('data/states-counties.test.json'),
      $.getJSON('data/county-adjacent.json')
    ).done(function(
      percentages,
      populations,
      statesCounties,
      countyNeighbors
    ) {
      log.info("Preparing data");
      //console.log(countyNeighbors);

      if(percentages["1"] != "success") reject("Could not load data/percentages.json");
      if(populations["1"] != "success") reject("Could not load data/populations.json");
      if(statesCounties["1"] != "success") reject("Could not load data/states-counties.json");
      if(countyNeighbors["1"] != "success") reject("Could not load data/county-adjacent.json");



      zombies.percentages = {
        "0": percentages["0"]
      }
      zombies.populations = {
        "0": populations["0"]
      }


      zombies.statesCounties = statesCounties["0"];
      zombies.countyNeighbors = countyNeighbors["0"];
      zombies.methodExit();
      resolve();
    });

  },





  /*
  UTIL METHODS
  */
  //Returns a object containing all attributes in passed in objects.
  mergeObjects: function(obj1, obj2) {
    var obj3 = {};
    for(var attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for(var attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  },


  //Rounds number to a fixed number of 4 decimal places.
  roundNumber: function(num) {
    log.debug("Rounding",num)
    return Number(num).toFixed(4);
  },

  //Determines perctange and rounds it.
  zombiePercentage: function(zombiePop, humanPop){
    zombies.methodEntry();
    log.debug(zombiePop, humanPop)
    if(zombiePop <= 0) return 0;
    if(humanPop <= 0) return 100;

    var result = zombiePop / (humanPop + zombiePop);
    result = result * 100;
    zombies.methodExit();
    return zombies.roundNumber(result);
  },



  /*
    Logging Util Methods
  */

  methodEntry: function() {
    log.debug("Method Entry:", zombies.methodEntry.caller.name);
  },

  methodExit: function() {
    log.debug("Method Exit:", zombies.methodExit.caller.name);

  }

} //End - zombies
