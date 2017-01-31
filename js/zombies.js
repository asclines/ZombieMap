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

        // var obj = zombies.mapObject.maps.us_lcc_en;
        // for(var name in obj) {
        //   if(obj.hasOwnProperty(name)) {
        //     log.debug("Property:",name)
        //   }
        // }


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

    zombies.mapObject = new jvm.MultiMap({
      container: $('#map'),
      maxLevel: 1,

      main: {
        map: 'us_lcc_en',
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
          },
            {
              scale: ['#4682B4 ', '#990000'],
              attribute: 'fill',
              values: zombies.lakeCodes,
              min: 0,
              max: 100
        }]
        }
      },
      mapUrlByCode: function(code, multiMap) {
        var mapId = code.toLowerCase() + "_lcc_en";
        updateMap = function() {
          setTimeout(function() {
            if(zombies.mapObject.maps[mapId])
              zombies.mapObject.maps[mapId].series.regions[0].setValues(zombies.percentages[zombies.currentTime])
            else updateMap();
          }, 100);
        };

        updateMap();

        return 'data/counties/jquery-jvectormap-data-' +
          code.toLowerCase() + '-' +
          multiMap.defaultProjection + '-en.js';
      }

    });

    $('#map').bind('regionClick.jvectormap', zombies.onRegionClick);




    done();
  }, //End - setupMap

  onRegionTipShow: function(event, label, code) {
    // log.debug("onRegionTipShow", label, code)
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


  onRegionClick: function(event, code) {
    if(zombies.inProgress) return;
    if(zombies.isCodeState(code)) return;
    //var deltaValue = 100; //Number of zombies to add to each with each click
    var deltaValue = Number(document.getElementById('deltaClick').value);

    var countyPop = zombies.populations["0"][code];
    var stateCode = zombies.countyState[code];
    var statePop = zombies.populations["0"][stateCode];

    if(countyPop.humans > deltaValue) {
      countyPop.humans -= deltaValue;
      countyPop.zombies += deltaValue;
      statePop.humans -= deltaValue;
      statePop.zombies += deltaValue;
    } else {
      countyPop.zombies += countyPop.humans;
      statePop.humans -= countyPop.humans;
      statePop.zombies += countyPop.humans;
      countyPop.humans = 0;
    }
    zombies.populations["0"][code] = countyPop;
    zombies.populations["0"][stateCode] = statePop;
    zombies.percentages["0"][code] = zombies.zombiePercentage(countyPop.zombies, countyPop.humans);
    zombies.percentages["0"][stateCode] = zombies.zombiePercentage(statePop.zombies, statePop.humans);

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
    if(!zombies.spinner) zombies.spinner = new Spinner();
    zombies.spinner.spin()
    document.getElementById('zombie-settings-params').appendChild(zombies.spinner.el);

  },

  onResetClick: function() {
    log.debug("Resetting");
    zombies.inProgress = false;
    zombies.currentTime = 0;
    document.getElementById('calculateSubmit').style.display = 'block'
    document.getElementById('div-runtime').style.display = 'none'
    document.getElementById('curTimeValue').innerHTML = zombies.currentTime;

    new Promise(zombies.getInitialData).then(function() {
      zombies.forEachMap(function(map) {
        map.series.regions[0].setValues(zombies.percentages["0"])
      });
    })

  },

  showSimulation: function() {
    log.debug("Start simulation")
    $("#map").removeClass('loading')
    zombies.spinner.stop();
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
    zombies.currentTime = ui.value;
    document.getElementById('curTimeValue').innerHTML = ui.value;
    zombies.forEachMap(function(map) {
      map.series.regions[0].setValues(zombies.percentages[ui.value]);
    })
  },




  /*
  MATH HANDLING
  */
  calculateSimulation: function(resolve) {
    log.info("Calculating Simulation");

    //First: Create all the space needed.
    for(var i = 0; i < zombies.maxTime; i++) {
      zombies.percentages[i + 1] = {};
      zombies.populations[i + 1] = {};
      for(var stateCode in zombies.statesCounties) {
        zombies.populations[i + 1][stateCode] = {}
        zombies.populations[i + 1][stateCode] = {}
        var counties = zombies.statesCounties[stateCode];
        counties.forEach(function(countyCode) {
          zombies.populations[i + 1][countyCode] = {};
        })
      }
    }



    zombies.calcAllStatesNextIteration(0, function() {
      resolve();
    });
  },

  calcAllStatesNextIteration: function(timeIndex, done) {
    if(timeIndex >= zombies.maxTime) {
      done();
      return;
    }


    var statesPromises = [];
    for(var stateCode in zombies.statesCounties) {

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
      timeIndex++;
      zombies.calcAllStatesNextIteration(timeIndex, done);
    })
  },

  calculateStateNextIteration: function(stateCode, timeIndex, resolve) {


    var counties = zombies.statesCounties[stateCode];
    var nextHumanPop = 0;
    var nextZombiePop = 0;

    counties.forEach(function(countyCode) {
      var countyPop = zombies.populations[timeIndex][countyCode]
      var countyNeighborPops = []


      try {
        zombies.countyNeighbors[countyCode].forEach(function(neighborCode) {
          countyNeighborPops.push(zombies.populations[timeIndex][neighborCode])
        })
      } catch(e) {
        log.warn("calculateStateNextIteration", e, " countyCode: ", countyCode)
      } finally {
        results = zombieModel.nextIteration(countyPop, countyNeighborPops);
        zombies.populations[timeIndex + 1][countyCode].humans = results.humans;
        zombies.populations[timeIndex + 1][countyCode].zombies = results.zombies;
        zombies.percentages[timeIndex + 1][countyCode] = zombies.zombiePercentage(results.zombies, results.humans);
        nextHumanPop += results.humans;
        nextZombiePop += results.zombies;
      }

    })
    var nextPercentage = zombies.zombiePercentage(nextZombiePop, nextHumanPop);


    nextHumanPop = zombies.roundNumber(nextHumanPop);
    nextZombiePop = zombies.roundNumber(nextZombiePop);

    zombies.populations[timeIndex + 1][stateCode].humans = ((nextHumanPop < 0) ? 0 : nextHumanPop);
    zombies.populations[timeIndex + 1][stateCode].zombies = ((nextZombiePop < 0) ? 0 : nextZombiePop);

    zombies.percentages[timeIndex + 1][stateCode] = nextPercentage
    // log.debug("Percentage at stateCode", stateCode, "at time", timeIndex + 1, "is", nextPercentage)
    // log.debug("Human population at stateCode", stateCode, "at time", timeIndex + 1, "is", nextHumanPop)
    // log.debug("Zombie population at stateCode", stateCode, "at time", timeIndex + 1, "is", nextZombiePop)

    resolve(timeIndex);

  },





  /*
  DATA HANDLING
  */
  getInitialData: function(resolve, reject) {
    log.info("Loading data files")
    $.when(
      $.getJSON('data/percentages.json'),
      $.getJSON('data/populations.json'),
      $.getJSON('data/states-counties.json'),
      $.getJSON('data/county-adjacent.json'),
      $.getJSON('data/county-state.json'),
      $.getJSON('data/lake-codes.json')
    ).done(function(
      percentages,
      populations,
      statesCounties,
      countyNeighbors,
      countyState,
      lakeCodes
    ) {
      log.info("Preparing data");

      if(percentages["1"] != "success") reject("Could not load data/percentages.json");
      if(populations["1"] != "success") reject("Could not load data/populations.json");
      if(statesCounties["1"] != "success") reject("Could not load data/states-counties.json");
      if(countyNeighbors["1"] != "success") reject("Could not load data/county-adjacent.json");
      if(countyState["1"] != "success") reject("Could not load data/county-state.json")
      if(lakeCodes["1"] != "success") reject("Could not load data/lake-codes.json")


      zombies.percentages = {
        "0": percentages["0"]
      }
      zombies.populations = {
        "0": populations["0"]
      }

      zombies.statesCounties = statesCounties["0"];
      zombies.countyNeighbors = countyNeighbors["0"];
      zombies.countyState = countyState["0"];
      zombies.lakeCodes = lakeCodes["0"]
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


  //Rounds number to a fixed number of 2 decimal places.
  roundNumber: function(num) {
    return Number(num).toFixed(2);
  },

  //Determines perctange and rounds it.
  zombiePercentage: function(zombiePop, humanPop) {
    if(zombiePop <= 0) return 0;
    if(humanPop <= 0) return 100;

    var result = zombiePop / (humanPop + zombiePop);
    result = result * 100;
    return Number(zombies.roundNumber(result));
  },


  //Returns true if code is for a state instead of county
  isCodeState: function(code) {
    return code.substring(0, 2) == "US";
  },

  //Runs function fun on each map
  forEachMap: function(fun) {
    for(var mapId in zombies.mapObject.maps) {
      fun(zombies.mapObject.maps[mapId]);
    }
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
