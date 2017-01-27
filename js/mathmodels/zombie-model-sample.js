//This belongs in every file that adds to zombieSim namespace to prevent
//overwrting.
var zombieSim = zombieSim || {};

zombieSim.model = {
  params: { //With default values
    biteChance: 20,
    growthRate: 5
  },

  paramSettingsHtmlFile: "html/mathmodels/zombie-model-sample.html",

  setup: function(){
    document.getElementById('biteChance').innerHTML = this.params.biteChance;
    $("#slider-spread").slider({
      value: zombieSim.model.params.biteChance,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieSim.model.params.biteChance = ui.value;
        document.getElementById('biteChance').innerHTML = zombieSim.model.params.biteChance;
      }
    });

    document.getElementById('growthRate').innerHTML = this.params.growthRate;
    $("#slider-growth").slider({
      value: zombieSim.model.params.growthRate,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        zombieSim.model.params.growthRate = ui.value;
        document.getElementById('growthRate').innerHTML = zombieSim.model.params.growthRate;
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
