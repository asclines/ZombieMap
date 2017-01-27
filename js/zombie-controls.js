//This belongs in every file that adds to zombieSim namespace to prevent
//overwrting.
var zombieSim = zombieSim || {};

zombieSim.controls = {

  setup: function(){
    zombieControls.submit();
    zombieControls.reset();
  },

  initData: function(cb){
    new Promise(function(resolve, reject) {
      zombieSim.data.getInitialData(function() {
        if(zombieSim.map.data != null) {
          resolve()
        } else {
          reject(Error("Could not load initial data."))
        }
      })
    }).then(function() {
      zombieControls.settings();
      cb(null);
    }).catch(function(err) {
      console.log(err);
      cb(err);
    });
  }
}

/**
  Holds all internal methods for setting up controls.
**/
var zombieControls = {
  submit: function() {
    $('#calculateSubmit').click(function() {
      zombieSim.inProgress = true;
      document.getElementById('calculateSubmit').style.display = 'none'

      $("#map").addClass('loading')


      new Promise(function(resolve, reject) {
        zombieSim.maxTime = document.getElementById('timeMax').value;
        zombieSim.math.launch(function(results) {
           console.log(results);
          $("#map").removeClass('loading')
          $("#map").empty();
          zombieSim.map.setup();

          if(results == null) {
            reject(Error("Did not receive results."));
          } else {
            resolve(results);
          }
        })
      }).then(function(results) {
        zombieSim.map.data = results;
        document.getElementById('div-runtime').style.display = 'block'
        zombieControls.simulatiorSlider();

      }, function(err) {
        console.log(err);
      });
    });
  },

  simulatiorSlider: function(){
    $("#slider-simulator").slider({
      value: zombieSim.currentTime,
      min: 0,
      max: document.getElementById('timeMax').value,
      step: 1,
      slide: function(event, ui) {
        zombieSim.currentTime = ui.value;
        document.getElementById('curTimeValue').innerHTML = zombieSim.currentTime;
        zombieSim.map.mapObject.params.main.series.regions[0].values = zombieSim.map.data.percentage[zombieSim.currentTime];
        //zombieSim.map.mapObject.params.main.series.regions[0].setValues(zombieSim.map.data.percentage[zombieSim.currentTime]);
      }
    });
  },

  settings: function() {
    document.getElementById('timeMax').value = 42; //Default setting
    zombieSim.model.setup();
  },

  reset: function() {
    $('#calculateReset').click(function() {
      zombieSim.inProgress = false;
      zombieSim.controls.initData(function(err) {
        document.getElementById('calculateSubmit').style.display = 'block'

        if(err == null) {
          zombieSim.currentTime = 0;
          document.getElementById('div-runtime').style.display = 'none'
          document.getElementById('curTimeValue').innerHTML = zombieSim.currentTime;
          zombieSim.map.mapObject.params.main.series.regions[0].values = zombieSim.map.data.percentage[zombieSim.currentTime];
          zombieSim.controls.setup();
        } else {
          console.log(zombieSim.map.mapObject);
          console.log(err);
        }
      })

      $("#map").removeClass('loading')
      $("#map").empty();
      zombieSim.map.setup();

    });
  },

}
