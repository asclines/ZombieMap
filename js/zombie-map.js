//This belongs in every file that adds to zombieSim namespace to prevent
//overwrting.
var zombieSim = zombieSim || {};

zombieSim.inProgress = false; //Various parts of the elements in this site depend on this fact.

zombieSim.map = {
  setup: function(){
    zombieSim.currentTime = 0;
    $('#map').vectorMap({
      map: 'us_aea',
      backgroundColor: "transparent",
      series: {
        regions: [{
          scale: ['#99ff99', '#990000'],
          attribute: 'fill',
          values: zombieSim.map.data.percentage[zombieSim.currentTime],
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
            '<b>Zombie takeover: </b>' + zombieSim.map.data.percentage[zombieSim.currentTime][code] + '% </b></br>' +
            '<b>Human Population: </b>' + Number(zombieSim.map.data.humanpop[zombieSim.currentTime][code]).toLocaleString() + '</b></br>' +
            '<b>Zombie Population: </b>' + Number(zombieSim.map.data.zombiepop[zombieSim.currentTime][code]).toLocaleString()

          );
        } else {
          label.html(
            '<b>' + label.html() + '</b></br>' +
            '<b>Population: </b>' + Number(zombieSim.map.data.humanpop[zombieSim.currentTime][code]).toLocaleString() + '</b></br>' +
            '<b>Initial Zombies </b>' + zombieSim.map.data.percentage[zombieSim.currentTime][code] + '%'
          );
        }
      },
      onRegionClick: function(event, code) {
        //Only increment if the "Set Map" tab is loaded
        if(!zombieSim.inProgress){
          zombieSim.map.data.percentage["0"][code]++;
        }
      }
    });

    this.mapObject = $('#map').vectorMap('get', 'mapObject');
  }

}
