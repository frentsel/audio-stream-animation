let AudioSource = function() {

  const player = new Audio();
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();

  player.crossOrigin = 'anonymous';
  analyser.fftSize = 256;

  audioCtx.createMediaElementSource(player).connect(analyser);
  analyser.connect(audioCtx.destination);

  setInterval(() => {
    analyser.getByteFrequencyData(this.streamData);
  }, 20);

  this.volume = 0;
  this.streamData = new Uint8Array(128);
  this.playStream = function(streamUrl) {
    player.src = streamUrl;
    player.play();
  }
};

let draw = function(buffer, canvas) {

  let ctx = canvas.getContext("2d");
  let { width, height } = canvas;
  let barWidth = (width / buffer.length) * 2.5;
  let barHeight;
  let x = 0;

  draw = function() {
    x = 0;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    buffer.forEach((_height) => {
      barHeight = _height * 0.6;
      ctx.fillStyle = '#3c90ce';
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    });

    requestAnimationFrame(draw);
  }

  draw();
};
