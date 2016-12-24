$(function() {
    $.getJSON('./data/data.json', function(data) {
        var val = 0;
        statesValues = jvm.values.apply({}, jvm.values(data.states)),
            metroPopValues = Array.prototype.concat.apply([], jvm.values(data.metro.population)),
            metroUnemplValues = Array.prototype.concat.apply([], jvm.values(data.metro.unemployment));

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
            }
        });

        var mapObject = $('#map').vectorMap('get', 'mapObject');


        $('#setdata').click(function() {
            console.log("Click");

            var slider = document.getElementById('slider');
            slider.style.display = 'block'

            for(var year in data.states) {
                yearData = data.states[year]
                for(var state in data.states[year]) {
                    var value = year / 4 * 100;
                    data.states[year][state] = value;
                }
            }

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
