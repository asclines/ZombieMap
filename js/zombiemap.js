$(function() {
    calcApocalypse({
    default: true}, function(data){
        var val = 0;
        $('#map').vectorMap({
            map: 'us_aea',
            series: {
                regions: [{
                    scale: ['#99ff99', '#990000'],
                    attribute: 'fill',
                    values: data.states[val],
                    min: 0,
                    max: 100,
                    legend: {
                        horizontal: true,
                        title: 'Percentage taken over by zombies'
                    }
                }]
            },

            onRegionTipShow: function(event, label, code) {
                label.html(
                    '<b>' + label.html() + '</b></br>' +
                    '<b>Zombie takeover: </b>' + data.states[val][code] + '%'
                );
            },
            onRegionClick: function(event, code){
              console.log(event);
              console.log(code);
            }
        });

        var mapObject = $('#map').vectorMap('get', 'mapObject');


        $('#calculateSubmit').click(function() {
            console.log("Click");
            calcApocalypse(
              {
                maxIterations:document.getElementById('timeMax').value
              }, function(results){
                console.log(results);
                data = results;
              }
            );
            var slider = document.getElementById('slider');
            slider.style.display = 'block'
            $("#slider").slider({
                value: val,
                min: 0,
                max: document.getElementById('timeMax').value,
                step: 1,
                slide: function(event, ui) {
                    val = ui.value;
                    document.getElementById('curTimeValue').innerHTML = val;
                    mapObject.series.regions[0].setValues(data.states[ui.value]);
                }
            });
        });

    });
});
