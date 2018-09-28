let audioSource = (canvasEl, src) => {

  const player = new Audio(src);
  const context = new AudioContext();
  const analyser = context.createAnalyser();
  const streamData = new Uint8Array(128);

  let draw = (buffer, canvas) => {

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const barWidth = (width / buffer.length) * 2.5;
    let barHeight;
    let x = 0;
  
    draw = () => {
      x = 0;
      ctx.fillStyle = '#fff';
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

  player.crossOrigin = 'anonymous';
  player.play();

  analyser.fftSize = 256;
  context.createMediaElementSource(player).connect(analyser);
  analyser.connect(context.destination);

  setInterval(() => {
    analyser.getByteFrequencyData(streamData);
  }, 20);

  draw(streamData, canvasEl);
};
