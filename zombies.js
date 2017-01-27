log.setLevel('trace'); //See https://github.com/pimterry/loglevel for more

zombies = {
  inProgress: false, //Various parts of the elements in this site depend on this fact.
  currentTime: 0,
  init: function() {
    log.debug("Initializing zombies")
    new Promise(zombies.getInitialData).then(function(){
      log.debug("Done getting initial data")
      zombies.setupMap(function() {
        zombieModel.setup();
      })
    })

    $('#calculateSubmit').click(this.onLaunchClick);
    $('#calculateReset').click(this.onResetClick);

  },
  /*
  MAP HANDLING
  */
  setupMap: function(done) {
    log.debug("Setting up map")
    this.currentTime = 0;
    this.mapObject = new jvm.Map({
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
    zombies.currentLabel = label;
    zombies.currentHoverState = label.html();
    if(zombies.inProgress) {
      label.html(
        '<b>' + label.html() + '</b></br>' +
        '<b>Zombie takeover: </b>' + zombies.percentages[zombies.currentTime][code] + '% </b></br>' +
        '<b>Human Population: </b>' + Number(zombies.populations.human[zombies.currentTime][code]).toLocaleString() + '</b></br>' +
        '<b>Zombie Population: </b>' + Number(zombies.populations.zombie[zombies.currentTime][code]).toLocaleString()
      );
    } else {
      label.html(
        '<b>' + label.html() + '</b></br>' +
        '<b>Population: </b>' + Number(zombies.populations.human[zombies.currentTime][code]).toLocaleString() + '</b></br>' +
        '<b>Initial Zombies: </b>' + zombies.populations.zombie[zombies.currentTime][code]
      );
    }
  },

  onRegionClick: function(event, code) {
    if(zombies.inProgress) return;

    var humanPop = zombies.populations.human["0"][code];
    var zombiePop = zombies.populations.zombie["0"][code];

    if(humanPop > 100) {
      humanPop = humanPop - 100;
      zombiePop = zombiePop + 100;
      zombies.percentages["0"][code] = (zombiePop / humanPop) * 100;
    } else {
      zombiePop = zombiePop + humanPop;
      humanPop = 0;
      zombies.percentages["0"][code] = 0;
    }

    zombies.populations.human["0"][code] = humanPop;
    zombies.populations.zombie["0"][code] = zombiePop;

    zombies.currentLabel.html(
      '<b>' + zombies.currentHoverState + '</b></br>' +
      '<b>Population: </b>' + Number(zombies.populations.human[zombies.currentTime][code]).toLocaleString() + '</b></br>' +
      '<b>Initial Zombies: </b>' + zombies.populations.zombie[zombies.currentTime][code]
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
    zombies.currentTime = ui.value;
    document.getElementById('curTimeValue').innerHTML = zombies.currentTime;
    zombies.mapObject.series.regions[0].setValues(zombies.percentages[zombies.currentTime])

  },




  /*
  MATH HANDLING
  */
  calculateSimulation: function(resolve) {
    log.debug("Calculating Simulation");
    //TODO
    resolve();
  },



  /*
  DATA HANDLING
  */
  getInitialData: function(resolve, reject) {
    log.debug("Loading data files")
    $.when(
      $.getJSON('data/percentages.json'),
      $.getJSON('data/populations.json'),
      $.getJSON('data/states-counties.json'),
      $.getJSON('data/county-adjacent.json')
    ).done(function(
      percentages,
      populations,
      statesCounties,
      countyNeighbors
    ) {
      log.debug("Preparing data");
      //console.log(countyNeighbors);

      if (percentages["1"] != "success") reject("Could not load data/percentages.json");
      if (populations["1"] != "success") reject("Could not load data/populations.json");
      if (statesCounties["1"] != "success") reject("Could not load data/states-counties.json");
      if (countyNeighbors["1"] != "success") reject("Could not load data/county-adjacent.json");



      zombies.percentages = {
        "0": percentages["0"]
      }
      zombies.populations = {
          "human": {
            "0": populations["0"]["human"]
          },
          "zombie": {
            "0": populations["0"]["zombie"]
          }
      }

      zombies.statesCounties = statesCounties["0"];
      zombies.countyNeighbors = countyNeighbors["0"];

      resolve();
    });

  },





  /*
  UTIL METHODS
  */
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


  bigOut: function(number) {
    if(number.lt(0)) {
      number = number.times(0)
    }

    var result = number.toFixed(3);
    return result;
  }



} //End - zombies
