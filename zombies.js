
zombies = {
  inProgress: false, //Various parts of the elements in this site depend on this fact.

  setupMap: function() {
    this.currentTime = 0;
    this.mapObject = new jvm.Map({
      container: $('#map'),
      map: 'us_aea',
      backgroundColor: "transparent",
      series: {
        regions: [{
          scale: ['#99ff99', '#990000'],
          attribute: 'fill',
        //  values: this.data.percentage[zombieSim.currentTime],
          min: 0,
          max: 100,
          legend: {
            horizontal: true,
            title: 'Percentage taken over by zombies'
          }
          }]
      }
    });
  }
}
