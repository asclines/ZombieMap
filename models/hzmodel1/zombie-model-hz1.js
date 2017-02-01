
zombieModel = {

  paramSettingsHtmlFile: "models/hzmodel1/zombie-model-hz1.html",

  setup: function(){
    zombieModel.params = {  //With default values
      biteRate: 10

    };

    document.getElementById('biteRate').innerHTML = this.params.biteRate;
    $("#slider-bite-rate").slider({
      value: zombieModel.params.biteRate,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieModel.params.biteRate = ui.value;
        document.getElementById('biteRate').innerHTML = zombieModel.params.biteRate;
      }
    });
  },

  nextIteration: function(population, neighbors) {

  }
};
