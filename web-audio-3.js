//'use strict';

let play, changeFreq, oscillator, changeType;


let oscProp = {
    type: 'sine',
    frequency: 500,
    playing: false
}


let audioContext = new AudioContext();

window.onload = function(){
    play = () =>{
        if(!oscProp.playing){
            oscProp.playing = true;
            oscillator = audioContext.createOscillator();
            oscillator.type= oscProp.type;
            oscillator.frequency.setValueAtTime(oscProp.frequency, audioContext.currentTime);
    
    
            oscillator.connect(audioContext.destination);
            oscillator.start();
        }
        else{
            oscillator.stop();
            oscProp.playing = false;
        }
        
    }


    changeFreq = function(){
        oscProp.frequency  = document.getElementById('freqslider').value * 20;

        play(); //first play will stop the function
        play(); //second play will start the function again
    }

    changeType = function(){
        oscProp.type = document.querySelector('input[name = "waveform"]:checked').value

        play();
        play();
    }
}