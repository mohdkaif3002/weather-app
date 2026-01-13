const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const API_KEY = process.env.WEATHER_API_KEY;
if (!API_KEY) console.warn('WARNING: WEATHER_API_KEY not set in .env');

app.get('/weather', async (req, res) => {
  const city = req.query.city || req.query.q || 'mumbai';
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: 'Proxy error' });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
