/**
File: zombie-controls.js

Manages all the controls and user input for the apocalypse.
**/
function setupControls() {
  $( '#calculateSubmit' ).click( function () {
    $( "#form-params" ).addClass( 'loading' )
    $( "#form-map" ).addClass( 'loading' )
    $( "#form-calc" ).addClass( 'loading' )

    calcApocalypse( {
      maxIterations: document.getElementById( 'timeMax' ).value,
      biteChance: document.getElementById( 'biteChance' ).value,
      growthRate: document.getElementById( 'growthRate' ).value,
      data: zombieMapData.data
    }, function ( results ) {
      $( "#form-params" ).removeClass( 'loading' )
      $( "#form-map" ).removeClass( 'loading' )
      $( "#form-calc" ).removeClass( 'loading' )

      zombieMapData.data = results;
    } );
    //  var slider = document.getElementById('slider');
    document.getElementById( 'div-runtime' ).style.display = 'block'
    $( "#slider" ).slider( {
      value: zombieMapData.val,
      min: 0,
      max: document.getElementById( 'timeMax' ).value,
      step: 1,
      slide: function ( event, ui ) {
        zombieMapData.val = ui.value;
        document.getElementById( 'curTimeValue' ).innerHTML = zombieMapData.val;
        zombieMapData.mapObject.series.regions[ 0 ].setValues( zombieMapData.data.states[ ui.value ] );
      }
    } );
  } );
}
