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
      onRegionTipShow: zombies.onRegionTipShow,
      onRegionClick: zombies.onRegionClick,
      series: {
        regions: [{
          scale: ['#99ff99', '#990000'],
          attribute: 'fill',
          values: zombies.data.percentage[zombies.currentTime],
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

  onRegionTipShow: function(event, label, code) {
    zombies.currentLabel = label;
    zombies.currentHoverState = label.html();
    if(zombies.inProgress) {
      label.html(
        '<b>' + label.html() + '</b></br>' +
        '<b>Zombie takeover: </b>' + zombies.data.percentage[zombies.currentTime][code] + '% </b></br>' +
        '<b>Human Population: </b>' + Number(zombies.data.humanPop[zombies.currentTime][code]).toLocaleString() + '</b></br>' +
        '<b>Zombie Population: </b>' + Number(zombies.data.zombiePop[zombies.currentTime][code]).toLocaleString()
      );
    } else {
      label.html(
        '<b>' + label.html() + '</b></br>' +
        '<b>Population: </b>' + Number(zombies.data.humanPop[zombies.currentTime][code]).toLocaleString() + '</b></br>' +
        '<b>Initial Zombies: </b>' + zombies.data.zombiePop[zombies.currentTime][code]
      );
    }
  },

  onRegionClick: function(event, code) {
    if(zombies.inProgress) return;

    var humanPop = zombies.data.humanPop["0"][code];
    var zombiePop = zombies.data.zombiePop["0"][code];

    if(humanPop > 100) {
      humanPop = humanPop - 100;
      zombiePop = zombiePop + 100;
      zombies.data.percentage["0"][code] = (zombiePop / humanPop) * 100;
    } else {
      zombiePop = zombiePop + humanPop;
      humanPop = 0;
      zombies.data.percentage["0"][code] = 0;
    }

    zombies.data.humanPop["0"][code] = humanPop;
    zombies.data.zombiePop["0"][code] = zombiePop;

    zombies.currentLabel.html(
      '<b>' + zombies.currentHoverState + '</b></br>' +
      '<b>Population: </b>' + Number(zombies.data.humanPop[zombies.currentTime][code]).toLocaleString() + '</b></br>' +
      '<b>Initial Zombies: </b>' + zombies.data.zombiePop[zombies.currentTime][code]
    );

  },




  /*
  DATA HANDLING
  */

  getInitialData: function(done) {
    log.debug("Loading data files")
    $.when(
      $.getJSON('data/states-initial.json'),
      $.getJSON('data/states-pops.json'),
      $.getJSON('data/states-neighbors.json')
    ).done(function(
      statesInitial,
      statesPopulation,
      statesNeighbors
    ) {
      log.debug("Preparing data")
      this.statesNeighbors = statesNeighbors;

      var initialStatePercentage = JSON.parse(JSON.stringify(statesInitial));
      var initialStatesZombiePopulation = JSON.parse(JSON.stringify(statesInitial));

      var stateData = {
        "percentage": {
          "0": initialStatePercentage["0"]
        },
        "humanPop": {
          "0": statesPopulation["0"]
        },
        "zombiePop": {
          "0": initialStatesZombiePopulation["0"]
        }
      }
      this.data = stateData;


      log.debug("Done preparing data")
      done();
    }.bind(this));

  },





/*
UTIL METHODS
*/
mergeObjects: function(obj1, obj2){
  var obj3 = {};
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
},


bigOut: function(number){
  if(number.lt(0)){
    number = number.times(0)
  }

  var result = number.toFixed(3);
  return result;
}



} //End - zombies
