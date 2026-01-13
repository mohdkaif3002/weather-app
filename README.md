# Weather App

Simple client-side weather app that fetches current weather from WeatherAPI and displays city, temperature, time, date, weekday, condition, humidity, and wind speed.

## Features
- Fetches real-time weather data from WeatherAPI.   
- Displays city, country, temperature, time, date, weekday, weather condition, humidity, and wind speed.
- Responsive design for various screen sizes.

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/mohdkaif3002/weather-app.git
   cd weather-app
   ```
2. Obtain a WeatherAPI key from [WeatherAPI](https://www.weatherapi.com/).
3. Create a `.env` file in the root directory and add your API key:
   ```env
   WEATHER_API_KEY=your_weatherapi_key_here
   ```  
4. Open `index.html` in your web browser to view the app.

## Optional server proxy (recommended)

To avoid exposing your WeatherAPI key in client-side code, run the included Node proxy which forwards requests to WeatherAPI.

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and set your key:

```bash
copy .env.example .env   # Windows (PowerShell/CMD)
# or
cp .env.example .env     # macOS / Linux
```

Edit `.env` and set `WEATHER_API_KEY=your_key_here`.

3. Start the server and open the app:

```bash
npm start
# open http://localhost:5500 in your browser
```

The client now calls `/weather?city=...` by default; if you want to test direct API calls, set `USE_DIRECT_API = true` in `script.js` and provide your key there (not recommended).

## Technologies Used
- HTML5
- CSS3  
- JavaScript (ES6)
