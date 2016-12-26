/**
File: zombie-map.js

Manages the map object.
**/

$(function() {
    $('.menu .item').tab();

    getInitialData(function(data) {
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
            onRegionClick: function(event, code) {
                //Only increment if the "Set Map" tab is loaded
                if(document.getElementById('status-setmap').classList.contains("active")) {
                    data.states["0"][code]++;
                }
            }
        });

        var mapObject = $('#map').vectorMap('get', 'mapObject');


        $('#calculateSubmit').click(function() {
            $("#form-params").addClass('loading')
            $("#form-map").addClass('loading')
            $("#form-calc").addClass('loading')

            calcApocalypse({
                maxIterations: document.getElementById('timeMax').value,
                biteChance: document.getElementById('biteChance').value,
                data: data
            }, function(results) {
                $("#form-params").removeClass('loading')
                $("#form-map").removeClass('loading')
                $("#form-calc").removeClass('loading')

                data = results;
            });
            //  var slider = document.getElementById('slider');
            document.getElementById('div-runtime').style.display = 'block'
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
