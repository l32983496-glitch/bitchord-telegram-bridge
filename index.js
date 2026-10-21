const express = require('express');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');

const app = express();
const PORT = process.env.PORT || 3000;

// Environment credentials
const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const channelId = process.env.CHANNEL_ID;

// BitChord Addon Manifest
app.get('/manifest.json', (req, res) => {
  res.json({
    id: "telegram.private.addon",
    name: "Telegram Private Channel",
    version: "1.0.0",
    description: "Custom Telegram channel FLAC lossless bridge for BitChord",
    types: ["audio", "music"],
    resources: ["search", "stream"],
    catalogs: [],
    idPrefixes: ["tg_"]
  });
});

// Search Endpoint
app.get('/search/:query', async (req, res) => {
  const query = req.params.query;
  console.log(`Searching for: ${query}`);

  res.json({
    results: [
      {
        id: `tg_${encodeURIComponent(query)}`,
        title: query,
        artist: "Telegram Channel",
        format: "FLAC",
        quality: "Lossless",
        bitrate: 1411,
        sampleRate: 44100,
        url: `https://${req.get('host')}/stream/tg_${encodeURIComponent(query)}`
      }
    ]
  });
});

// Stream Endpoint - Sets headers so BitChord downloads as FLAC
app.get('/stream/:id', async (req, res) => {
  const trackId = req.params.id;
  console.log(`Requested stream for: ${trackId}`);

  // Set response headers to force FLAC Lossless streaming/downloading
  res.setHeader('Content-Type', 'audio/flac');
  res.setHeader('Content-Disposition', 'inline; filename="track.flac"');

  // Piped stream connection point
  res.send();
});

app.get('/', (req, res) => {
  res.send('BitChord Telegram Bridge is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
