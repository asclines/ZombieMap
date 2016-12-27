/**
File: zombie-controls.js

Manages all the controls and user input for the apocalypse.
**/

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

      $("#form-params").addClass('loading')
      $("#form-map").addClass('loading')
      $("#form-calc").addClass('loading')

      new Promise(function(resolve, reject) {
        calcApocalypse({
          maxIterations: document.getElementById('timeMax').value,
          biteChance: document.getElementById('biteChance').value,
          growthRate: document.getElementById('growthRate').value,
          data: zombieMapData.data
        }, function(results) {
          $("#form-params").removeClass('loading')
          $("#form-map").removeClass('loading')
          $("#form-calc").removeClass('loading')
          if(results == null) {
            reject(Error("Did not receive results."));
          } else {
            resolve(results);
          }
        })
      }).then(function(results) {
        zombieMapData.data = results;
        document.getElementById('div-runtime').style.display = 'block'
        zombieControls.slider();

      }, function(err) {
        console.log(err);
      });
    });
  },

  slider: function() {
    $("#slider").slider({
      value: zombieMapData.val,
      min: 0,
      max: document.getElementById('timeMax').value,
      step: 1,
      slide: function(event, ui) {
        zombieMapData.val = ui.value;
        document.getElementById('curTimeValue').innerHTML = zombieMapData.val;
        zombieMapData.mapObject.series.regions[0].setValues(zombieMapData.data.states[ui.value]);
      }
    });
  },

  reset: function() {
    $('#calculateReset').click(function() {
      initData(function(err) {
        if(err == null) {
          zombieMapData.val = 0;
          document.getElementById('div-runtime').style.display = 'none'
          document.getElementById('curTimeValue').innerHTML = zombieMapData.val;
          zombieMapData.mapObject.series.regions[0].setValues(zombieMapData.data.states[zombieMapData.val]);
          setupControls()
        } else {
          console.log(err);
        }
      })
    });
  }
}
