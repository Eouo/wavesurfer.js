// A basic example

import WaveSurfer from 'wavesurfer.js'

const wavesurfer = WaveSurfer.create({
  container: document.body,
  progressColor: 'rgb(100, 0, 100)',
  url: '/examples/audio/audio.wav',
  waveColor: '#22c55e',
  height: 100,
  barWidth: 50,
  barGap: 2,
  barRadius: 25,
})

wavesurfer.on('click', () => {
  wavesurfer.play()
})
