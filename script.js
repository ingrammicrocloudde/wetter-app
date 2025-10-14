class WeatherApp {
    constructor() {
        this.apiKey = 'YOUR_API_KEY'; // Ersetzen Sie dies durch Ihren OpenWeatherMap API-Schlüssel
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.isCelsius = true;
        this.currentWeatherData = null;
        
        this.initializeElements();
        this.bindEvents();
        this.loadSettings();
        this.checkApiKey();
    }

    initializeElements() {
        // Input elements
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.unitToggle = document.getElementById('unitToggle');

        // Display elements
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.weatherContainer = document.getElementById('weatherContainer');

        // Weather data elements
        this.cityName = document.getElementById('cityName');
        this.currentDate = document.getElementById('currentDate');
        this.currentTemp = document.getElementById('currentTemp');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.weatherDescription = document.getElementById('weatherDescription');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        this.visibility = document.getElementById('visibility');
        this.uvIndex = document.getElementById('uvIndex');
        this.forecastContainer = document.getElementById('forecastContainer');
    }

    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.locationBtn.addEventListener('click', () => this.getCurrentLocation());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.unitToggle.addEventListener('click', () => this.toggleUnits());
        
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        this.cityInput.addEventListener('input', () => {
            this.clearError();
        });
    }

    loadSettings() {
        // Theme laden
        const savedTheme = localStorage.getItem('weatherAppTheme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';

        // Temperatureinheit laden
        const savedUnit = localStorage.getItem('weatherAppUnit') || 'celsius';
        this.isCelsius = savedUnit === 'celsius';
        this.unitToggle.textContent = this.isCelsius ? '°F' : '°C';
    }

    checkApiKey() {
        if (this.apiKey === 'YOUR_API_KEY') {
            this.showError('Bitte fügen Sie Ihren OpenWeatherMap API-Schlüssel in script.js hinzu!');
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        this.themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
        localStorage.setItem('weatherAppTheme', newTheme);
    }

    toggleUnits() {
        this.isCelsius = !this.isCelsius;
        this.unitToggle.textContent = this.isCelsius ? '°F' : '°C';
        localStorage.setItem('weatherAppUnit', this.isCelsius ? 'celsius' : 'fahrenheit');
        
        // Temperatureinheiten im DOM aktualisieren
        document.querySelectorAll('.unit').forEach(unit => {
            unit.textContent = this.isCelsius ? '°C' : '°F';
        });

        // Aktuelle Wetterdaten neu anzeigen, falls vorhanden
        if (this.currentWeatherData) {
            this.displayCurrentWeather(this.currentWeatherData);
        }
    }

    async handleSearch() {
        const city = this.cityInput.value.trim();
        if (!city) {
            this.showError('Bitte geben Sie eine Stadt ein!');
            return;
        }

        await this.getWeatherByCity(city);
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation wird von diesem Browser nicht unterstützt!');
            return;
        }

        this.showLoading();
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await this.getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                this.hideLoading();
                let errorMessage = 'Fehler beim Abrufen der Position: ';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Standortzugriff wurde verweigert.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Standortinformationen sind nicht verfügbar.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Zeitüberschreitung beim Abrufen der Position.';
                        break;
                    default:
                        errorMessage += 'Unbekannter Fehler.';
                        break;
                }
                this.showError(errorMessage);
            }
        );
    }

    async getWeatherByCity(city) {
        this.showLoading();
        
        try {
            const units = this.isCelsius ? 'metric' : 'imperial';
            const currentWeatherUrl = `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}&lang=de`;
            const forecastUrl = `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}&lang=de`;

            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(currentWeatherUrl),
                fetch(forecastUrl)
            ]);

            if (!currentResponse.ok) {
                throw new Error(`Stadt nicht gefunden: ${city}`);
            }

            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();

            this.currentWeatherData = currentData;
            this.displayCurrentWeather(currentData);
            this.displayForecast(forecastData);
            this.showWeather();
            
        } catch (error) {
            this.showError(error.message);
        }
    }

    async getWeatherByCoords(lat, lon) {
        try {
            const units = this.isCelsius ? 'metric' : 'imperial';
            const currentWeatherUrl = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}&lang=de`;
            const forecastUrl = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}&lang=de`;

            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(currentWeatherUrl),
                fetch(forecastUrl)
            ]);

            if (!currentResponse.ok) {
                throw new Error('Wetterdaten konnten nicht abgerufen werden');
            }

            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();

            this.currentWeatherData = currentData;
            this.displayCurrentWeather(currentData);
            this.displayForecast(forecastData);
            this.showWeather();
            
        } catch (error) {
            this.showError(error.message);
        }
    }

    displayCurrentWeather(data) {
        // Standort und Datum
        this.cityName.textContent = `${data.name}, ${data.sys.country}`;
        this.currentDate.textContent = new Date().toLocaleDateString('de-DE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Temperatur
        const temp = Math.round(data.main.temp);
        this.currentTemp.textContent = temp;

        // Wetter Icon und Beschreibung
        const iconCode = data.weather[0].icon;
        this.weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        this.weatherIcon.alt = data.weather[0].description;
        this.weatherDescription.textContent = data.weather[0].description;

        // Details
        const tempUnit = this.isCelsius ? '°C' : '°F';
        const speedUnit = this.isCelsius ? 'km/h' : 'mph';
        const windSpeed = this.isCelsius ? 
            Math.round(data.wind.speed * 3.6) : 
            Math.round(data.wind.speed);

        this.feelsLike.textContent = `${Math.round(data.main.feels_like)}${tempUnit}`;
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${windSpeed} ${speedUnit}`;
        this.pressure.textContent = `${data.main.pressure} hPa`;
        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        
        // UV Index (falls verfügbar)
        this.uvIndex.textContent = '-';
    }

    displayForecast(data) {
        this.forecastContainer.innerHTML = '';
        
        // Gruppiere Vorhersagen nach Tagen
        const dailyForecasts = {};
        
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateKey = date.toDateString();
            
            if (!dailyForecasts[dateKey]) {
                dailyForecasts[dateKey] = {
                    date: date,
                    temps: [],
                    weather: item.weather[0],
                    items: []
                };
            }
            
            dailyForecasts[dateKey].temps.push(item.main.temp);
            dailyForecasts[dateKey].items.push(item);
        });

        // Erstelle Karten für die nächsten 5 Tage
        const days = Object.values(dailyForecasts).slice(0, 5);
        
        days.forEach(day => {
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            
            const maxTemp = Math.round(Math.max(...day.temps));
            const minTemp = Math.round(Math.min(...day.temps));
            const tempUnit = this.isCelsius ? '°C' : '°F';
            
            const dayName = day.date.toLocaleDateString('de-DE', { weekday: 'short' });
            const dayDate = day.date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' });
            
            forecastCard.innerHTML = `
                <div class="date">${dayName}, ${dayDate}</div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${day.weather.icon}@2x.png" 
                         alt="${day.weather.description}">
                </div>
                <div class="temps">
                    <span class="high">${maxTemp}${tempUnit}</span>
                    <span class="low">${minTemp}${tempUnit}</span>
                </div>
                <div class="description">${day.weather.description}</div>
            `;
            
            this.forecastContainer.appendChild(forecastCard);
        });
    }

    showLoading() {
        this.hideAll();
        this.loadingSpinner.classList.remove('hidden');
    }

    showError(message) {
        this.hideAll();
        this.errorMessage.querySelector('p').textContent = message;
        this.errorMessage.classList.remove('hidden');
    }

    showWeather() {
        this.hideAll();
        this.weatherContainer.classList.remove('hidden');
    }

    hideAll() {
        this.loadingSpinner.classList.add('hidden');
        this.errorMessage.classList.add('hidden');
        this.weatherContainer.classList.add('hidden');
    }

    hideLoading() {
        this.loadingSpinner.classList.add('hidden');
    }

    clearError() {
        this.errorMessage.classList.add('hidden');
    }
}

// App initialisieren, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
