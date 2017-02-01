
zombieModel = {

  paramSettingsHtmlFile: "models/hzmodel1/zombie-model-hz1.html",

  setup: function(){
    zombieModel.params = {  //With default values
      biteRate: 10,
      biteInfectsChance: 20
    };

    // Handling Bite Infection or Kill
    document.getElementById('biteInfects').innerHTML = this.params.biteInfectsChance;
    document.getElementById('biteKills').innerHTML = 100 - this.params.biteInfectsChance;

    $("#slider-bite-infects").slider({
      value: zombieModel.params.biteInfectsChance,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieModel.params.biteInfectsChance = ui.value;
        document.getElementById('biteInfects').innerHTML = zombieModel.params.biteInfectsChance;
        document.getElementById('biteKills').innerHTML = 100 - zombieModel.params.biteInfectsChance;
      }
    });



    // Handling Bite Rate
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
