$(function() {
    var chart;
    var data = odata;
    // $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=world-population-density.json&callback=?', function(popData) {

    // Initiate the chart
    //$('#container').highcharts('Map', {
    chart = Highcharts.mapChart('container', {
        title: {
            text: 'Zombiegeddon'
        },

        subtitle: {
            text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/us/custom/us-113-congress.js">United States of America, congressional districts (113th)</a>'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            },
            enableDoubleClickZoom: false
        },
        colorAxis: {
            min: 0,
            minColor: "#282B36",
            maxColor: "#bf0000"
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function() {
                            var text = '<b>Zombie Added</b><br>' +
                                '<br>Location: ' + this.name + ' ' + this.value;

                            data[this.district].zombies++;
                            data[this.district].humans--;
                            data[this.district].value = data[this.district].zombies;
                            chart.series[0].setData(data);


                            //chart = this.series.chart;
                            // console.log(this);

                            //  console.log(data[this.district])
                            if(!chart.clickLabel) {
                                chart.clickLabel = chart.renderer.label(text, 0, 250)
                                    .css({
                                        width: '180px'
                                    })
                                    .add();
                            } else {
                                chart.clickLabel.attr({
                                    text: text
                                });
                            }
                        }
                    }
                }
            }
        },


        series: [{
            data: data,
            mapData: Highcharts.maps['countries/us/custom/us-113-congress'],
            joinBy: 'hc-key',
            name: 'Zombie Count',
            states: {
                hover: {
                    color: '#a4edba'
                }
            },
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            }
        }, {
            name: 'Separators',
            type: 'mapline',
            data: Highcharts.geojson(Highcharts.maps['countries/us/custom/us-113-congress'], 'mapline'),
            color: 'silver',
            showInLegend: false,
            enableMouseTracking: false
        }]
    });

/*
TODO:
Here is where you are at; you cannot get the map to refresh after updating values
*/
    $('#setdata').click(function() {
      for (var k in data){
        // console.log(data[k]);
        data[k].value++;// = 12;
      }
        // $.each(data, function() {
        //     this.value = Math.round(Math.random() * 1000);
        //     // console.log(this.value);
        // });
        console.log(data[0].value);
        chart.series[0].setData(data);
        // console.log(chart.series[0].data[0]);
        chart.setTitle({
            text: "What"
        });

        chart.redraw();

        // console.log(chart);
    });
    // });
});
