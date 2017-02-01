
zombieModel = {

  paramSettingsHtmlFile: "models/hzmodel1/zombie-model-hz1.html",

  setup: function(){
    zombieModel.params = {  //With default values
      biteRate: 10,
      biteInfectsChance: 20,
      zombieDeathRate: 10,
      encounterRate: 25
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

    // Handling Humans Killing Zombies
    document.getElementById('zombieDeathRate').innerHTML = this.params.zombieDeathRate;
    $("#slider-zombie-death-rate").slider({
      value: zombieModel.params.zombieDeathRate,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieModel.params.zombieDeathRate = ui.value;
        document.getElementById('zombieDeathRate').innerHTML = zombieModel.params.zombieDeathRate;
      }
    });

    // Handling Humans running into Zombies
    document.getElementById('encounterRate').innerHTML = this.params.encounterRate;
    $("#slider-encounter-rate").slider({
      value: zombieModel.params.encounterRate,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieModel.params.encounterRate = ui.value;
        document.getElementById('encounterRate').innerHTML = zombieModel.params.encounterRate;
      }
    });

  },

  nextIteration: function(population, neighbors) {

  }
};
