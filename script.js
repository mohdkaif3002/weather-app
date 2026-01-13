// The client calls the local server proxy at `/weather?city=...`.
// The server holds the API key in `.env` and forwards requests to WeatherAPI.
// If you want to call WeatherAPI directly (not recommended), set `USE_DIRECT_API = true` below.
const USE_DIRECT_API = false;
const API_KEY = '';

const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const cityElement = document.getElementById('city');
const dayElement = document.getElementById('day');

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

let defaultCity = 'mumbai';

async function fetchWeatherData(targetlocation = defaultCity) {
    let url;
    if (USE_DIRECT_API && API_KEY) {
        url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(targetlocation)}&aqi=yes`;
    } else {
        // call local proxy (server.js) which forwards to WeatherAPI
        url = `/weather?city=${encodeURIComponent(targetlocation)}`;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Weather API error', response.status);
            alert('Could not fetch weather data.');
            return;
        }

        const data = await response.json();
        if (!data || !data.location || !data.current) {
            console.error('Unexpected API response', data);
            alert('Invalid weather data received.');
            return;
        }

        const city = data.location.name || targetlocation;
        const localtime = data.location.localtime || '';
        const temp_c = data.current.temp_c;
        const condition = data.current.condition && data.current.condition.text ? data.current.condition.text : '';
        const humidity = data.current.humidity;
        const wind_kph = data.current.wind_kph;

        updateWeatherDetails(city, localtime, temp_c, condition, humidity, wind_kph);
    } catch (err) {
        console.error('Fetch failed', err);
        alert('Network error while fetching weather data.');
    }
}

function updateWeatherDetails(city, localtime, temp_c, condition, humidity, wind_kph) {
    let date = '--', time = '--:--';
    if (localtime && localtime.includes(' ')) {
        const parts = localtime.split(' ');
        date = parts[0] || date;
        time = parts[1] || time;
    }

    let weekday = '--';
    if (date && date.includes('-')) {
        const parts = date.split('-').map(Number);
        if (parts.length === 3) {
            const [y, m, d] = parts;
            try {
                weekday = new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'long' });
            } catch (e) {
                weekday = '--';
            }
        }
    }

    cityElement.innerText = city;
    timeElement.innerText = time;
    dateElement.innerText = date;
    temperatureElement.innerText = (typeof temp_c === 'number') ? `${temp_c}°C` : '--°C';
    conditionElement.innerText = condition || '-';
    humidityElement.innerText = `Humidity: ${humidity ?? '--'}`;
    windSpeedElement.innerText = `Wind Speed: ${wind_kph ?? '--'} km/h`;
    if (dayElement) dayElement.innerText = weekday;
}

function onSearch() {
    const target = cityInput.value.trim();
    if (!target) return;
    fetchWeatherData(target);
}

searchButton.addEventListener('click', onSearch);
cityInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') onSearch(); });

// Initial load
fetchWeatherData(defaultCity);