/**
File: zombie-controls.js

Manages all the controls and user input for the apocalypse.
**/

var zombieControlsData = {
  biteSpread: 20,
  growthRate: 5,
  maxTime: 42
}
function setupControls() {
  zombieControls.submit();
  zombieControls.reset();
}

function initData(cb) {
  new Promise(function(resolve, reject) {
    getInitialData(function(data) {
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
        zombieMapData.maxIterations = zombieControlsData.maxTime;
        zombieMapData.biteChance = zombieControlsData.biteSpread;
        zombieMapData.growthRate = zombieControlsData.growthRate;
        calcApocalypse(function(results) {
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
    document.getElementById('timeMax').value = zombieControlsData.maxTime;


    document.getElementById('biteChance').innerHTML = zombieControlsData.biteSpread;
    $("#slider-spread").slider({
      value: zombieControlsData.biteSpread,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieControlsData.biteSpread = ui.value;
        document.getElementById('biteChance').innerHTML = zombieControlsData.biteSpread;
      }
    });

    document.getElementById('growthRate').innerHTML = zombieControlsData.biteSpread;
    $("#slider-growth").slider({
      value: zombieControlsData.growthRate,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieControlsData.growthRate = ui.value;
        document.getElementById('growthRate').innerHTML = zombieControlsData.growthRate;
      }
    });


  },

  reset: function() {
    $('#calculateReset').click(function() {
      zombieSimInProgress = false;
      initData(function(err) {
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
