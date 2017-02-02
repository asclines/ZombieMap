
zombieModel = {

  paramSettingsHtmlFile: "models/hzmodel1/zombie-model-hz1.html",

  setup: function(){
    zombieModel.params = {  //With default values, NOTE: Currently spread is not modifiable by user
      biteRate: 80,
      biteInfectsChance: 90,
      zombieDeathRate: 10,
      encounterRate: 40,
      birthRate: 5,
      spread: 25
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

    // Handling Humans being borth
    document.getElementById('birthRate').innerHTML = this.params.birthRate;
    $("#slider-birth-rate").slider({
      value: zombieModel.params.birthRate,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieModel.params.birthRate = ui.value;
        document.getElementById('birthRate').innerHTML = zombieModel.params.birthRate;
      }
    });


  },

  nextIteration: function(population, neighbors) {
    var biteRate = this.params.biteRate / 100;
    var biteInfectsChance = this.params.biteInfectsChance / 100;
    var zombieDeathRate = this.params.zombieDeathRate / 100;
    var encounterRate = this.params.encounterRate / 100;
    var birthRate = this.params.birthRate / 100;
    var spread = this.params.spread;

    //First get results from equations without spread
    var calcResults = this.calc(population.humans, population.zombies, biteRate, biteInfectsChance, zombieDeathRate, encounterRate, birthRate);
    var nextHumanPop = calcResults.newHumanPop;
    var nextZombiePop = calcResults.newZombiePop;
    var totalPopulation = nextHumanPop + nextZombiePop;

    //Now determine results from spread
    for(var neighborIndex in neighbors){
      var neighborZombiePop = neighbors[neighborIndex].zombies;
      if(neighborZombiePop == 0) continue;
      if(neighborZombiePop > spread){
        nextHumanPop -= spread;
        nextZombiePop += spread;
      } else {
        nextHumanPop -= neighborZombiePop;
        nextZombiePop += neighborZombiePop;
      }
    }

    var zombieTakeoverPercentage = zombies.zombiePercentage(nextZombiePop, nextHumanPop);
    // log.debug("Results:", nextZombiePop, nextHumanPop, zombieTakeoverPercentage)
    return {
      zombies: Number(nextZombiePop),
      humans: Number(nextHumanPop),
      percentage: Number(zombieTakeoverPercentage)
    };

  },


  //Handles everything from equations except spread
  calc: function(curHumanPop, curZombiePop, biteRate, biteInfectsChance, zombieDeathRate, encounterRate, birthRate){
    if(curHumanPop == 0) return {
      newHumanPop:0,
      newZombiePop: curZombiePop
    }
    var curPop = curHumanPop + curZombiePop;
    var bornHumans = birthRate * curHumanPop;
    if(curZombiePop == 0) return {
      newHumanPop: Math.floor(bornHumans + curHumanPop),
      newZombiePop: 0
    }

    var encounters = encounterRate * curHumanPop * curZombiePop / curPop;
    var bittenHumans = biteRate * encounters;
    var infectedHumans = biteInfectsChance * bittenHumans;
    var killedZombies = zombieDeathRate * encounters;

    var newHumanPop = curHumanPop + bornHumans - bittenHumans;
    var newZombiePop = curZombiePop + infectedHumans - killedZombies;

    var results = {
      newHumanPop: Number(Math.floor(newHumanPop)),
      newZombiePop: Number(Math.floor(newZombiePop))
    }

    return results;
  }


};
