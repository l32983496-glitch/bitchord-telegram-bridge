const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Manifest declaring FLAC and Lossless support
app.get('/manifest.json', (req, res) => {
  res.json({
    id: "telegram.private.addon",
    name: "Telegram Private Channel",
    version: "1.0.0",
    description: "Custom Telegram Lossless FLAC channel bridge",
    types: ["audio", "music"],
    resources: ["search", "stream"],
    catalogs: [],
    idPrefixes: ["tg_"]
  });
});

// Search route returning Lossless audio metadata
app.get('/search/:query', (req, res) => {
  const query = req.params.query;
  
  res.json({
    results: [
      {
        id: "tg_sample_track",
        title: query,
        format: "FLAC",
        quality: "Lossless",
        bitrate: 1411,
        sampleRate: 44100
      }
    ]
  });
});

app.get('/', (req, res) => {
  res.send('BitChord Telegram Bridge is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
