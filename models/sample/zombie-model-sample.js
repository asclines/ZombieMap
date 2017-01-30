

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
    log.debug("nextIteration: ", population, neighbors)

    var trueBiteChance = this.params.biteChance / 100;
    var trueGrowthRate = this.params.growthRate / 100;

    //Initialize next populations with current populations
    var nextHumanPop = population.humans;
    var nextZombiePop = population.zombies;

    var totalPopulation = nextHumanPop + nextZombiePop;

    // Find the deltas, aka, how many zombies will be added and how many humans will die
    var newZombiePop = 0;
    if(nextHumanPop > 0) { //If there are humans to convert.
      newZombiePop = Math.floor((nextZombiePop * nextHumanPop * trueBiteChance)/totalPopulation);
    }

    //Now subtract the newest zombies from the human population.
    nextHumanPop -= newZombiePop;

    //And add newest zombies;
    nextZombiePop += newZombiePop;

    log.debug("newZombiePop =", newZombiePop);

    //Now thats see if any neighbors want to join.


    // var currentHumanPop = population.humans;
    // var currentZombiePop = population.zombies;


    //var newZombiePop = ((currentHumanPop > 0) ? (currentZombiePop * trueBiteChance * currentHumanPop) : 0);
    //currentHumanPop -= newZombiePop;

    // for(var neighborIndex in neighbors){
    //   if(currentHumanPop > 0){
    //     var newestZombies = neighbors[neighborIndex].humans * trueBiteChance * currentHumanPop;
    //     newZombiePop+= newestZombies;
    //     currentHumanPop -= newestZombies;
    //   }
    // }

    //How many humans were born this day?
    var newHumanPop = Math.floor(nextHumanPop * trueGrowthRate);
    nextHumanPop += newHumanPop;

    var zombieTakeoverPercentage = zombies.zombiePercentage(nextZombiePop, nextHumanPop);


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
      zombies: nextZombiePop,
      humans: nextHumanPop,
      percentage: zombieTakeoverPercentage
    };
  }
};
