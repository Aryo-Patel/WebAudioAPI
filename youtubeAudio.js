let playYT;
const visualiser = document.getElementById('youtubeVisualiser');


const getAudioData = () => {
    
    requestAnimationFrame(getAudioData);

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyserNode.getByteFrequencyData(dataArray);

    
    const width = visualiser.width;
    const height = visualiser.height;
    
    const canvasContext = visualiser.getContext('2d');
    //const barWidth =width/bufferLength;
    const barWidth = width/nonzeroLen(dataArray);
    canvasContext.clearRect(0,0, width, height);

    
    dataArray.forEach((item, index) => {
        if(item > 255){
            console.log(item);
        }
        const y = item/255 * height/2;
        const x = barWidth*index;

        canvasContext.fillStyle = `hsl(${y/height * 2 *200}, 100%, 50%)`;
        canvasContext.fillRect(x, height-y, barWidth, y);
    })
}

const nonzeroLen = (arr) => {
    let count = 0;
    arr.forEach(elem => {
        if(elem !== 0){
            count+=1;
        }
    });
    return count;
}
const youtubeAudioCtx  = new AudioContext();
const audio = new Audio("./testAudio.mp3");

const params = {
    gain: {
        high: 1.0,
        mid: 1.0,
        low: 1.0
    }
}

const bassNode = new BiquadFilterNode(youtubeAudioCtx, {
    type: 'lowshelf',
    frequency: '500',
    gain: 0
})

const analyserNode = new AnalyserNode(youtubeAudioCtx, {fftSize: 256});


const source = youtubeAudioCtx.createMediaElementSource(audio);



source
    .connect(bassNode)
    .connect(analyserNode)
    .connect(youtubeAudioCtx.destination);



window.onload = function(){
    playYT = () => {
        audio.play();
    }
    getAudioData();
}
