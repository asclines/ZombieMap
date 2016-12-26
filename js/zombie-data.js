function getInitialData(cb) {
  $.getJSON('data/zombie-initial-states.json', function(emptyData){
    data = {
      "states": {
        "0": emptyData
      }
    }
    cb(data);
  })
}
