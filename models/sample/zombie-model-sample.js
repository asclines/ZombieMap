

zombieModel = {

  paramSettingsHtmlFile: "models/sample/zombie-model-sample.html",

  setup: function(){
    zombieModel.params = {  //With default values
      biteChance: 20,
      growthRate: 5
    };
    document.getElementById('biteChance').innerHTML = this.params.biteChance;
    $("#slider-spread").slider({
      value: zombieModel.params.biteChance,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieModel.params.biteChance = ui.value;
        document.getElementById('biteChance').innerHTML = zombieModel.params.biteChance;
      }
    });

    document.getElementById('growthRate').innerHTML = this.params.growthRate;
    $("#slider-growth").slider({
      value: zombieModel.params.growthRate,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieModel.params.growthRate = ui.value;
        document.getElementById('growthRate').innerHTML = zombieModel.params.growthRate;
      }
    });
  },

  nextIteration: function(population, neighbors) {
    // log.debug("nextIteration: ", population, neighbors)
    var trueBiteChance = this.params.biteChance / 100;
    var trueGrowthRate = this.params.growthRate / 100;
    var currentHumanPop = population.humans;
    var currentZombiePop = population.zombies;


    var newZombiePop = ((currentHumanPop > 0) ? (currentZombiePop * trueBiteChance * currentHumanPop) : 0);
    currentHumanPop -= newZombiePop;

    for(var neighborIndex in neighbors){
      if(currentHumanPop > 0){
        var newestZombies = neighbors[neighborIndex].humans * trueBiteChance * currentHumanPop;
        newZombiePop+= newestZombies;
        currentHumanPop -= newestZombies;
      }
    }

    var newHumanPop = currentHumanPop * trueGrowthRate;
    currentHumanPop += newHumanPop;

    var sumPop = currentHumanPop + currentZombiePop;
    var zombieTakeoverPercentage = currentZombiePop / sumPop;


    // var newZombiePop = 0 new Big(0);
    // if(population.humans.gt(0)){
    //   newZombiePop = population.zombies.times(trueBiteChance);
    // }

    // for(var neighborIndex in neighbors) {
    //   if(population.humans.gt(0)){
    //     var newestZombies = neighbors[neighborIndex].humans.times(trueBiteChance);
    //     newZombiePop = newZombiePop.plus(newestZombies);
    //   }
    // }
    // var newHumanPop = new Big(population.humans).times(trueGrowthRate);
    // var totalHumanPop = new Big(population.humans).minus(newZombiePop).plus(newHumanPop);
    // var totalZombiePop = new Big(population.zombies).plus(newZombiePop);
    // var sumPop = new Big(totalHumanPop).plus(totalZombiePop);
    // var zombieTakeoverPercentage = new Big(totalZombiePop).div(sumPop);

    return {
      zombies: ((currentZombiePop < 0) ? 0 : currentZombiePop),
      humans: ((currentHumanPop < 0 ) ? 0 : currentHumanPop),
      percentage: (zombieTakeoverPercentage * 100)
    };
  }
};
