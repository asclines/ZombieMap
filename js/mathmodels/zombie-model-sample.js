//This belongs in every file that adds to zombieSim namespace to prevent
//overwrting.
var zombieSim = zombieSim || {};

zombieSim.model = {
  params: {
    biteChance: .20,
    growthRate: .05
  },

  paramSettingsHtmlFile: "html/mathmodels/zombie-model-sample.html",

  setup: function(){
    document.getElementById('biteChance').innerHTML = this.params.biteChance;
    $("#slider-spread").slider({
      value: this.params.biteChance,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        this.params.biteChance = ui.value;
        document.getElementById('biteChance').innerHTML = this.params.biteChance;
      }
    });

    document.getElementById('growthRate').innerHTML = this.params.growthRate;
    $("#slider-growth").slider({
      value: this.params.growthRate,
      min: 0,
      max: 100,
      step: 1,
      slide: function(event, ui){
        this.params.growthRate = ui.value;
        document.getElementById('growthRate').innerHTML = this.params.growthRate;
      }
    });
  },

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
      zombies: zombieSim.utils.bigOut(totalZombiePop),
      humans: zombieSim.utils.bigOut(totalHumanPop),
      percentage: zombieSim.utils.bigOut(zombieTakeoverPercentage.times(100))
    };
  }
};
