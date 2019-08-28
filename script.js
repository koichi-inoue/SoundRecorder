// Global Variable
const width = 480;
const height = 360
let mic, recorder, soundFile;
let state = 0;  // 0:未録音  1:録音中  2:録音済み・再生中
let fft;

// SetUp
function setup() {
  var cv=createCanvas(width, height);
  cv.parent("screen");
  noFill();

  mic = new p5.AudioIn();
  mic.start();

  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();

  fft = new p5.FFT();
  fft.setInput(mic);
}

 // DrawLoop
function draw() {

  background(200);
  let waveform = fft.waveform();
  beginShape();
    for(i=0; i<waveform.length; i++){
      var x = map(i, 0, waveform.length, 0, width);
      var y = map(waveform[i], -1.0, 1.0, height, 0);
      vertex(x,y);
    }
  endShape();

}

// Functions

function StartAudioRecording(){
  if (state!=1 && mic.enabled) {
    recorder.record(soundFile);
    message.textContent="Now Recording!";
    state = 1;
  }
}

function StopAudioRecording(){
  if (state===1) {
    recorder.stop();
    message.textContent="Recorded";
    state = 2;
  } else if (state===2) {
    soundFile.stop();
  }
}

function PlayAudio(){
  if (state===2) {
    soundFile.play();
  }
}

function SaveAudio(){
  if (state===2) {
    saveSound(soundFile, 'myAudio.wav');
  }
}
