let audioContext = new AudioContext();


//input is connected to nodes in a row

let oscillator = audioContext.createOscillator();

//connect oscillator to audiocontext output node
//oscillator input which creates music connected to destination which is audioContext.destination


//oscillator.connect(audioContext.destination);


// oscillator.start();
// setTimeout(() => {
//     oscillator.stop();
// }, 500)
//oscillator sound plays for 1/2 a second at the given note

//filter is intermediate node. Audiocontext.destination is the final output. in between you put a filter and it helps change the sound

let filter = audioContext.createBiquadFilter();

oscillator.connect(filter);
filter.connect(audioContext.destination);

filter.type = 'highpass'; //you need to specify a type for the filter
filter.frequency.setTargetAtTime(2000, audioContext.currentTime, 3);
//set target at time, sets on frequency of a filter. 2000 is the frequency of the filter, second method is when you want the filter to apply, last value is a 1, meaning exponential format. 0 is a different format. it is how slow do you want the effect to happen. If the time constant is high, the more time it will take the filter to be applied. For here it will start large and then get small slower



oscillator.start();
setTimeout(() => {
    oscillator.stop();
}, 2000)