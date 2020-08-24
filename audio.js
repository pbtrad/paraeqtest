"use strict";

var audioContext = new AudioContext();

function audioFileLoader(fileDirectory) {
    var playSound = undefined;
    var soundObj = {};
    soundObj.fileDirectory = fileDirectory;
    var getSound = new XMLHttpRequest();
    getSound.open("GET", soundObj.fileDirectory, true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {
        audioContext.decodeAudioData(getSound.response, function(buffer) {
            soundObj.soundToPlay = buffer;

        });
    };

    getSound.send();

    soundObj.play = function(time) {
        playSound = audioContext.createBufferSource();
        playSound.buffer = soundObj.soundToPlay;
        parametricEQ(playSound, audioContext.destination);
        playSound.start(audioContext.currentTime + time || audioContext.currentTime);
    };

    soundObj.stop = function(time) {
        playSound.stop(audioContext.currentTime + time || audioContext.currentTime);
    };
    return soundObj;
}


function audioBatchLoader(obj) {

    for (var prop in obj) {
        obj[prop] = audioFileLoader(obj[prop]);

    }
    return obj;

}


var sound = audioBatchLoader({
    song: loadTrack


});


$(function() {
    var playing = false;
    $(".playpause-track").on("click", function() {

        if (!playing) {
            playing = true;
            sound.song.play();
            $(".playpause-track").attr("src", "images/stop.png");

        } else {
            playing = false;
            sound.song.stop();
            $(".transport-icon").attr("src", "images/play.png");
        }

    });

});