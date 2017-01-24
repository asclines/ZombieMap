var zombieMathModelParams = {
  biteChance: 20,
  growthRate: 5,
  maxTime: 42
}

function getZombieMathModelHtml(){
  return "html/mathmodels/zombie-model-sample.html";
}

function zombieMathModel(population, neighbors) {
  var newZombiePop = new Big(0);
  if(population.humans.gt(0)){
    newZombiePop = population.zombies.times(zombieMathModelParams.biteChance);
  }

  for(var neighborIndex in neighbors) {
    if(population.humans.gt(0)){
      var newestZombies = neighbors[neighborIndex].humans.times(zombieMathModelParams.biteChance);
      newZombiePop = newZombiePop.plus(newestZombies);
    }
  }
  var newHumanPop = new Big(population.humans).times(zombieMathModelParams.growthRate);
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
