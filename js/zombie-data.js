/**
File: zombie-data.js

Handles loading all data from JSON files
**/



/**
 Creates intial state data object and filles with intial data values.
 Callback returns the data
**/
function getInitialData(cb) {
    $.getJSON('data/zombie-initial-states.json', function(emptyData) {
        data = {
            "states": {
                "0": emptyData
            }
        }
        cb(data);
    })
}

/**
 Callback returns an object where the key is the ISO code of a state and the
 value is a list of ISO codes of the neighboring states.
**/
function getStateNeighbors(cb) {
    $.getJSON('data/states-neighbors.json', function(data) {
        cb(data);
    })
}
