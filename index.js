const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// BitChord Addon Manifest
app.get('/manifest.json', (req, res) => {
  res.json({
    id: "telegram.private.addon",
    name: "Telegram Private Channel",
    version: "1.0.0",
    description: "Custom Telegram channel addon for BitChord",
    types: ["audio"],
    resources: ["stream"],
    catalogs: [],
    idPrefixes: ["tg_"]
  });
});

app.get('/', (req, res) => {
  res.send('BitChord Telegram Bridge is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
