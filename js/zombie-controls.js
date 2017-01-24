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
      zombieSim.data.getInitialData(function(data) {
        if(data != null) {
          resolve(data)
        } else {
          reject(Error("Could not load initial data."))
        }
      })
    }).then(function(data) {
      zombieMapData.data = data;
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
      zombieSimInProgress = true;
      document.getElementById('calculateSubmit').style.display = 'none'

      $("#map").addClass('loading')


      new Promise(function(resolve, reject) {
        zombieMapData.maxIterations = zombieSim.model.params.maxTime;
        zombieSim.math.calcApocalypse(function(results) {
          // console.log(results);
          $("#map").removeClass('loading')
          if(results == null) {
            reject(Error("Did not receive results."));
          } else {
            resolve(results);
          }
        })
      }).then(function(results) {
        zombieMapData.data = results;
        document.getElementById('div-runtime').style.display = 'block'
        zombieControls.simulatiorSlider();

      }, function(err) {
        console.log(err);
      });
    });
  },

  simulatiorSlider: function(){
    $("#slider-simulator").slider({
      value: zombieMapData.val,
      min: 0,
      max: document.getElementById('timeMax').value,
      step: 1,
      slide: function(event, ui) {
        zombieMapData.val = ui.value;
        document.getElementById('curTimeValue').innerHTML = zombieMapData.val;
        zombieMapData.mapObject.series.regions[0].setValues(zombieMapData.data.percentage[zombieMapData.val]);
      }
    });
  },

  settings: function() {
    document.getElementById('timeMax').value = zombieSim.model.params.maxTime;
    zombieSim.model.setup();
  },

  reset: function() {
    $('#calculateReset').click(function() {
      zombieSimInProgress = false;
      zombieSim.controls.initData(function(err) {
        document.getElementById('calculateSubmit').style.display = 'block'

        if(err == null) {
          zombieMapData.val = 0;
          document.getElementById('div-runtime').style.display = 'none'
          document.getElementById('curTimeValue').innerHTML = zombieMapData.val;
          zombieMapData.mapObject.series.regions[0].setValues(zombieMapData.data.percentage[zombieMapData.val]);
          setupControls()
        } else {
          console.log(err);
        }
      })
    });
  },

}
