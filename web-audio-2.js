let audioContext = new AudioContext();
let oscillator = audioContext.createOscillator();

oscillator.connect(audioContext.destination);

//type
//default is sine wave but you can change the wave type
oscillator.type = 'sine'; 
//oscillator.type = 'square';
//oscillator.type= 'triangle';
//oscillator.type= 'sawtooth';
//theres custom but you need to pass through a periodic function

//frequency -- this sets the frequency to 260.8 (aprx C4) after x seconds of playing time). 
oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime +0.5);
//detune is like playing a note and then detuning it lol up or down
//shifts [can be negative] the current frequency by the given value at given time 
oscillator.detune.setValueAtTime(200, audioContext.currentTime + 1);
oscillator.detune.setValueAtTime(400, audioContext.currentTime + 2);
oscillator.detune.setValueAtTime(600, audioContext.currentTime + 3);
oscillator.detune.setValueAtTime(800, audioContext.currentTime + 4);


//plays the sound for currentTime + end_x - start_x time. Note it is measured in seconds not milliseconds. It is NOT easy to start the oscillator when you stop it. You will need to create a new oscillator if you want to play again
oscillator.start(audioContext.currentTime + 0.1);
oscillator.stop(audioContext.currentTime + 5);

//onended
//message played when it ends
oscillator.onended = () => {
    console.log('finished playing');
}