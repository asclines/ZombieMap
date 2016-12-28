/**
File: zombie-map.js

Manages the map object.
**/

var zombieMapData = {};

function setupMap() {
  zombieMapData.val = 0;
  $('#map').vectorMap({
    map: 'us_aea',
    series: {
      regions: [{
        scale: ['#99ff99', '#990000'],
        attribute: 'fill',
        values: zombieMapData.data.percentage[zombieMapData.val],
        min: 0,
        max: 100,
        legend: {
          horizontal: true,
          title: 'Percentage taken over by zombies'
        }
              }]
    },
    onRegionTipShow: function(event, label, code) {
      if(document.getElementById('status-setparams').classList.contains("active")) {
        label.html(
          '<b>' + label.html() + '</b></br>' +
          '<b>Population: </b>' + Number(zombieMapData.data.humanpop[zombieMapData.val][code]).toLocaleString()
        );
      } else if(document.getElementById('status-setmap').classList.contains("active")) {
        label.html(
          '<b>' + label.html() + '</b></br>' +
          '<b>Population: </b>' + Number(zombieMapData.data.humanpop[zombieMapData.val][code]).toLocaleString() + '</b></br>' +
          '<b>Initial Zombies </b>' + zombieMapData.data.percentage[zombieMapData.val][code] + '%'
        );
      } else if(document.getElementById('status-calc').classList.contains("active")) {
        label.html(
          '<b>' + label.html() + '</b></br>' +
          '<b>Zombie takeover: </b>' + zombieMapData.data.percentage[zombieMapData.val][code] + '% </b></br>' +
          '<b>Human Population: </b>' + Number(zombieMapData.data.humanpop[zombieMapData.val][code]).toLocaleString() + '</b></br>' +
          '<b>Zombie Population: </b>' + Number(zombieMapData.data.zombiepop[zombieMapData.val][code]).toLocaleString()

        );
      }

    },
    onRegionClick: function(event, code) {
      //Only increment if the "Set Map" tab is loaded
      if(document.getElementById('status-setmap').classList.contains("active")) {
        zombieMapData.data.percentage["0"][code]++;
      }
    }
  });

  zombieMapData.mapObject = $('#map').vectorMap('get', 'mapObject');

}

$(function() {
  $('.menu .item').tab();
  initData(function(err) {
    if(err == null) {
      setupMap();
      setupControls();
    } else {
      console.log(err);
    }

  });

});
