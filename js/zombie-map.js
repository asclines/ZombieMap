//This belongs in every file that adds to zombieSim namespace to prevent
//overwrting.
var zombieSim = zombieSim || {};

zombieSim.inProgress = false; //Various parts of the elements in this site depend on this fact.

zombieSim.map = {
  setup: function(){
    zombieMapData.val = 0;
    $('#map').vectorMap({
      map: 'us_aea',
      backgroundColor: "transparent",
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

        if(zombieSim.inProgress) {
          label.html(
            '<b>' + label.html() + '</b></br>' +
            '<b>Zombie takeover: </b>' + zombieMapData.data.percentage[zombieMapData.val][code] + '% </b></br>' +
            '<b>Human Population: </b>' + Number(zombieMapData.data.humanpop[zombieMapData.val][code]).toLocaleString() + '</b></br>' +
            '<b>Zombie Population: </b>' + Number(zombieMapData.data.zombiepop[zombieMapData.val][code]).toLocaleString()

          );
        } else {
          label.html(
            '<b>' + label.html() + '</b></br>' +
            '<b>Population: </b>' + Number(zombieMapData.data.humanpop[zombieMapData.val][code]).toLocaleString() + '</b></br>' +
            '<b>Initial Zombies </b>' + zombieMapData.data.percentage[zombieMapData.val][code] + '%'
          );
        }
      },
      onRegionClick: function(event, code) {
        //Only increment if the "Set Map" tab is loaded
        if(!zombieSim.inProgress){
          zombieMapData.data.percentage["0"][code]++;
        }
      }
    });

    zombieMapData.mapObject = $('#map').vectorMap('get', 'mapObject');
  }

}

var zombieMapData = {};
