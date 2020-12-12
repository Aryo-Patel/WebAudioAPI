let playYT, startingCount;
let playing = false;
startingCount = 0;
const visualiser = document.getElementById('youtubeVisualiser');


const getAudioData = () => {
    if(playing){
        requestAnimationFrame(getAudioData);

        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
    
        analyserNode.getByteFrequencyData(dataArray);
    
        
        const width = visualiser.width;
        const height = visualiser.height;
        
        const canvasContext = visualiser.getContext('2d');
        const barWidth =width/bufferLength;
        //const barWidth = width/nonzeroLen(dataArray);
        canvasContext.clearRect(0,0, width, height);
    
        
        // dataArray.forEach((item, index) => {
        //     const y = item/255 * height/2;
        //     const x = barWidth*index;
    
        //     canvasContext.fillStyle = `hsl(${y/height * 2 *200}, 100%, 50%)`;
        //     canvasContext.fillRect(x, height-y, barWidth, y);
        // })
        let offset = 0;
        startingCount += 0.5;
        for(let i = 0; i < dataArray.length; i++){
            offset += 1;
            let y = dataArray[i]/255 * height/2;
            const x = barWidth*i;
    
            // if(y < 40){
            //     y = 40;
            // }
            // y = y + 5*Math.sin(startingCount + offset);
    
            canvasContext.fillStyle = `hsl(${i*360/dataArray.length}, 100%, 50%)`;
            canvasContext.fillRect(x, height-y, barWidth, y);
        }
    }
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
const audio = new Audio("./words.mp3");

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

const trebleNode = new BiquadFilterNode(youtubeAudioCtx, {
    type: 'highshelf',
    frequency: 1500,
    gain: 0
})

const analyserNode = new AnalyserNode(youtubeAudioCtx, {fftSize: 64, smoothingTimeConstant: 0.8});


const source = youtubeAudioCtx.createMediaElementSource(audio);



source
    .connect(bassNode)
    .connect(trebleNode)
    .connect(analyserNode)
    .connect(youtubeAudioCtx.destination);



window.onload = function(){
    playYT = () => {
        playing = true;
        audio.play();
        getAudioData();
    }

}
