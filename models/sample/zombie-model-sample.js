

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
    var trueBiteChance = this.params.biteChance / 100;
    var trueGrowthRate = this.params.growthRate / 100;

    var newZombiePop = new Big(0);
    if(population.humans.gt(0)){
      newZombiePop = population.zombies.times(trueBiteChance);
    }

    for(var neighborIndex in neighbors) {
      if(population.humans.gt(0)){
        var newestZombies = neighbors[neighborIndex].humans.times(trueBiteChance);
        newZombiePop = newZombiePop.plus(newestZombies);
      }
    }
    var newHumanPop = new Big(population.humans).times(trueGrowthRate);
    var totalHumanPop = new Big(population.humans).minus(newZombiePop).plus(newHumanPop);
    var totalZombiePop = new Big(population.zombies).plus(newZombiePop);
    var sumPop = new Big(totalHumanPop).plus(totalZombiePop);
    var zombieTakeoverPercentage = new Big(totalZombiePop).div(sumPop);

    return {
      zombies: zombieSim.utils.bigOut(totalZombiePop),
      humans: zombieSim.utils.bigOut(totalHumanPop),
      percentage: zombieSim.utils.bigOut(zombieTakeoverPercentage.times(100))
    };
  }
};
