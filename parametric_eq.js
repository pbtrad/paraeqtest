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

//---Compressor---

var compressor = audioContext.createDynamicsCompressor();
//source.buffer = audioBuffer;
source.connect(compressor);
compressor.threshold.value = -40;
compressor.ratio.value = 12;
compressor.knee.value = 30;
compressor.release.value = 0.003;
compressor.attack.value = 0.250;


compressor.connect(audioContext.destination);




const audioEle = new Audio();
audioEle.crossOrigin = 'anonymous';
curr_track.crossOrigin = 'anonymous';
//audioEle.src = '04 - The Maids of Michelstown.mp3';//insert file name here
//audioEle.src = "https://edge.audioxi.com/98";
audioEle.src = "";
audioEle.autoplay = true;
audioEle.preload = 'auto';

//const audioSourceNode = audioContext.createMediaElementSource(curr_track);

//Create analyser node
const analyserNode = audioContext.createAnalyser();
//analyserNode.fftSize = 256;
analyserNode.fftSize = 512;

const bufferLength = analyserNode.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

//Set up audio node network
source.connect(analyserNode);
analyserNode.connect(audioContext.destination);

//Create 2D canvas
//const canvas = document.createElement('canvas');
const canvas = document.getElementById('spectrum');
//canvas.style.position = 'absolute';
//canvas.style.top = 0;
//canvas.style.left = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const canvasCtx = canvas.getContext('2d');
canvasCtx.clearRect(0, 0, canvas.width, canvas.height);


function draw() {
  //Schedule next redraw
  requestAnimationFrame(draw);

  //Get spectrum data
  //analyserNode.getFloatFrequencyData(dataArray);
  analyserNode.getByteFrequencyData(dataArray);
  //Draw black background
  canvasCtx.fillStyle = 'rgba(56, 56, 56, 0.7)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  //Draw spectrum
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let posX = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = (dataArray[i] + 600) * 2;
    canvasCtx.fillStyle = 'rgba(' + Math.floor(barHeight + 200) + '66, 142, 115, 0.5)';
    canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
    posX += barWidth + 1;
  }
};

draw();

AudioContext.resume();