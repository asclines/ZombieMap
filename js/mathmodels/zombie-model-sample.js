//This belongs in every file that adds to zombieSim namespace to prevent
//overwrting.
var zombieSim = zombieSim || {};

zombieSim.model = {
  params: {
    biteChance: .20,
    growthRate: .05,
    maxTime: 42
  },

  paramSettingsHtmlFile: "html/mathmodels/zombie-model-sample.html",

  nextIteration: function(population, neighbors) {

    var newZombiePop = new Big(0);
    if(population.humans.gt(0)){
      newZombiePop = population.zombies.times(this.params.biteChance);
    }

    for(var neighborIndex in neighbors) {
      if(population.humans.gt(0)){
        var newestZombies = neighbors[neighborIndex].humans.times(this.params.biteChance);
        newZombiePop = newZombiePop.plus(newestZombies);
      }
    }
    var newHumanPop = new Big(population.humans).times(this.params.growthRate);
    var totalHumanPop = new Big(population.humans).minus(newZombiePop).plus(newHumanPop);
    var totalZombiePop = new Big(population.zombies).plus(newZombiePop);
    var sumPop = new Big(totalHumanPop).plus(totalZombiePop);
    var zombieTakeoverPercentage = new Big(totalZombiePop).div(sumPop);

    return {
      zombies: bigOut(totalZombiePop),
      humans: bigOut(totalHumanPop),
      percentage: bigOut(zombieTakeoverPercentage.times(100))
    };
  }
};
