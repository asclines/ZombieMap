//This belongs in every file that adds to zombieSim namespace to prevent
//overwrting.
var zombieSim = zombieSim || {};

zombieSim.inProgress = false; //Various parts of the elements in this site depend on this fact.

zombieSim.map = {
  setup: function() {
    zombieSim.currentTime = 0;
    this.mapObject = new jvm.MultiMap({
      container: $('#map'),
      maxLevel: 1,
      main: {
        map: 'us_lcc_en',
        backgroundColor: "transparent",
        onRegionTipShow: function(event, label, code) {
          zombieSim.map.currentLabel = label;
          zombieSim.map.currentHoverState = label.html();
          if(zombieSim.inProgress) {
            label.html(
              '<b>' + label.html() + '</b></br>' +
              '<b>Zombie takeover: </b>' + zombieSim.map.data.percentage[zombieSim.currentTime][code] + '% </b></br>' +
              '<b>Human Population: </b>' + Number(zombieSim.map.data.humanpop[zombieSim.currentTime][code]).toLocaleString() + '</b></br>' +
              '<b>Zombie Population: </b>' + Number(zombieSim.map.data.zombiepop[zombieSim.currentTime][code]).toLocaleString()

            );
          } else {
            label.html(
              '<b>' + label.html() + '</b></br>' +
              '<b>Population: </b>' + Number(zombieSim.map.data.humanpop[zombieSim.currentTime][code]).toLocaleString() + '</b></br>' +
              '<b>Initial Zombies: </b>' + zombieSim.map.data.zombiepop[zombieSim.currentTime][code]
            );
          }
        },
        series: {
          regions: [{
            scale: ['#99ff99', '#990000'],
            attribute: 'fill',
            values: this.data.percentage[zombieSim.currentTime],
            min: 0,
            max: 100,
            legend: {
              horizontal: true,
              title: 'Percentage taken over by zombies'
            }
                }]
        }
      },
      mapUrlByCode: function(code, multiMap) {
        return 'data/counties/jquery-jvectormap-data-' +
          code.toLowerCase() + '-' +
          multiMap.defaultProjection + '-en.js';
      }
    });



    $('#map').bind('regionClick.jvectormap', function(event, code) {
      if(zombieSim.utils.isState(code)) return;
      if(zombieSim.inProgress) return;
      var humanPop = zombieSim.map.data.humanpop["0"][code];
      var zombiePop = zombieSim.map.data.zombiepop["0"][code];

      if(humanPop > 100){
        humanPop= humanPop - 100;
        zombiePop = zombiePop + 100;
        zombieSim.map.data.percentage["0"][code] = (zombiePop/humanPop) * 100;
      } else {
        zombiePop = zombiePop + humanPop;
        humanPop = 0;
        zombieSim.map.data.percentage["0"][code] = 0;
      }

      zombieSim.map.data.humanpop["0"][code] = humanPop;
      zombieSim.map.data.zombiepop["0"][code] = zombiePop;

      try {
        zombieSim.map.currentLabel.html(
          '<b>' + zombieSim.map.currentHoverState + '</b></br>' +
          '<b>Population: </b>' + Number(zombieSim.map.data.humanpop[zombieSim.currentTime][code]).toLocaleString() + '</b></br>' +
          '<b>Initial Zombies: </b>' + zombieSim.map.data.zombiepop[zombieSim.currentTime][code]
        );
      } catch(err) {
        console.log(err);
      }

      // try {
      //   // zombieSim.map.mapObject.maps.us_lcc_en.remove();
      //   // console.log(zombieSim.map.currentLabel);
      //   //console.log(zombieSim.map.mapObject.main);
      //   zombieSim.map.currentLabel.remove();
      //   $("#map").empty();
      //   zombieSim.map.setup();
      //   zombieSim.map.mapObject.setFocus(code)
      // } catch(err) {
      //   console.log(err);
      //   console.log(zombieSim.map.mapObject);
      // }

    });
  }

}
