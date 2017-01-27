log.setLevel('trace'); //See https://github.com/pimterry/loglevel for more

zombies = {
  inProgress: false, //Various parts of the elements in this site depend on this fact.
  currentTime: 0,
  init: function() {
    log.debug("Initializing zombies")
    this.getInitialData(this.setupMap);
  },
  /*
  MAP HANDLING
  */
  setupMap: function() {
    log.debug("Setting up map")
    this.currentTime = 0;
    this.mapObject = new jvm.Map({
      container: $('#map'),
      map: 'us_aea',
      backgroundColor: "transparent",
      series: {
        regions: [{
          scale: ['#99ff99', '#990000'],
          attribute: 'fill',
          values: zombies.stateData.percentage[zombies.currentTime],
          min: 0,
          max: 100,
          legend: {
            horizontal: true,
            title: 'Percentage taken over by zombies'
          }
          }]
      }
    });
  }, //End - setupMap




  /*
  DATA HANDLING
  */

  getInitialData: function(done) {
    log.debug("Loading data files")
    $.when(
      $.getJSON('data/states-initial.json'),
      $.getJSON('data/states-pops.json')
    ).done(function(
      statesInitial,
      statesPopulation
    ) {
      log.debug("Preparing data")
      var initialStatePercentage = JSON.parse(JSON.stringify(statesInitial));
      var initialStatesZombiePopulation = JSON.parse(JSON.stringify(statesInitial));

      var stateData = {
        "percentage": {
          "0": initialStatePercentage["0"]
        },
        "humanpop": {
          "0": statesPopulation["0"]
        },
        "zombiepop": {
          "0": initialStatesZombiePopulation["0"]
        }
      }
      zombies.stateData = stateData;


      log.debug("Done preparing data")
      done();
    });

  }





} //End - zombies
