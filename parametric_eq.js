"use strict";
var audioContext = new AudioContext();

var source = audioContext.createMediaElementSource(curr_track);
var parametricEQ1 = audioContext.createBiquadFilter();
parametricEQ1.type = "peaking";
parametricEQ1.gain.value = 0; // allow the user to change this
parametricEQ1.Q.value = 1; // allow the user to change this
parametricEQ1.frequency.value = 1000;

source.connect(parametricEQ1);
parametricEQ1.connect(audioContext.destination);

/*function parametricEQ(inputConnection, outputConnection) {
    inputConnection.connect(parametricEQ1);
    parametricEQ1.connect(outputConnection);
}*/

