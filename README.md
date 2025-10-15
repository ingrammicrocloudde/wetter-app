# 🌤️ Wetter App

Eine moderne, responsive Web-Anwendung zur Anzeige von Wetterinformationen mit 5-Tage-Vorhersage.

## 🚀 Live Demo

Die App ist bereitgestellt auf Azure Static Web Apps: [Live Demo](https://your-app-url.azurestaticapps.net)

## 📋 Azure Bereitstellung

Diese App ist für die Bereitstellung auf **Azure Static Web Apps** optimiert und wird automatisch über GitHub Actions bereitgestellt.

## Features

### 🎯 Hauptfunktionen

- **Aktuelle Wetterdaten**: Temperatur, Luftfeuchtigkeit, Windgeschwindigkeit, Luftdruck
- **5-Tage Wettervorhersage**: Detaillierte Vorhersage für die kommenden Tage  
- **Stadtsuche**: Suche nach Wetterdaten für beliebige Städte weltweit
- **Standortbasiert**: Automatische Erkennung des aktuellen Standorts
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile

### 🎨 Benutzeroberfläche

- **Dark/Light Theme**: Umschaltbarer Dunkelmodus
- **Temperatureinheiten**: Wechsel zwischen Celsius und Fahrenheit
- **Moderne Animationen**: Sanfte Übergänge und Hover-Effekte
- **Intuitive Bedienung**: Benutzerfreundliche Navigation

### 🔧 Technische Features

- **API Integration**: OpenWeatherMap API für präzise Wetterdaten
- **Local Storage**: Speicherung von Benutzereinstellungen
- **Error Handling**: Umfassende Fehlerbehandlung
- **Performance**: Optimierte Ladezeiten und Datenverarbeitung

## Installation

### 1. Repository klonen oder Dateien herunterladen

```bash
git clone https://github.com/ingrammicrocloudde/wetter-app.git
cd weather-app
```

### 2. API-Schlüssel einrichten

1. Besuchen Sie [OpenWeatherMap](https://openweathermap.org/api) und erstellen Sie ein kostenloses Konto
2. Generieren Sie einen API-Schlüssel
3. Öffnen Sie die Datei `script.js`
4. Ersetzen Sie `'YOUR_API_KEY'` in Zeile 4 durch Ihren API-Schlüssel:

```javascript
this.apiKey = 'ihr_api_schlüssel_hier';
```

### 3. Anwendung starten

Öffnen Sie die `index.html` Datei in Ihrem Webbrowser oder starten Sie einen lokalen Webserver:

```bash
# Mit Python 3
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server

# Mit PHP
php -S localhost:8000
```

## 🔧 Azure Static Web Apps Bereitstellung

### Voraussetzungen
- GitHub Repository
- Azure Account
- OpenWeatherMap API-Schlüssel

### Automatische Bereitstellung (empfohlen)

1. **Repository zu GitHub pushen**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Azure Static Web App erstellen**
   - Gehen Sie zum [Azure Portal](https://portal.azure.com)
   - Erstellen Sie eine neue "Static Web App"
   - Verbinden Sie Ihr GitHub Repository
   - Wählen Sie diese Einstellungen:
     - **App location**: `/`
     - **Output location**: `dist`
     - **API location**: (leer lassen)

3. **GitHub Actions automatisch konfiguriert**
   - Azure erstellt automatisch eine GitHub Actions Workflow-Datei
   - Die App wird bei jedem Push automatisch bereitgestellt

### Manuelle Bereitstellung mit SWA CLI

```bash
# SWA CLI installieren
npm install -g @azure/static-web-apps-cli

# App builden
npm run build:win

# Lokal testen
swa start

# In Azure bereitstellen
swa deploy --env production
```

### Umgebungsvariablen

Für die Produktion sollten Sie Ihren API-Schlüssel als Umgebungsvariable in Azure konfigurieren:

1. Gehen Sie zu Ihrer Static Web App im Azure Portal
2. Navigieren Sie zu "Configuration"
3. Fügen Sie eine neue Application Setting hinzu:
   - **Name**: `OPENWEATHER_API_KEY`
   - **Value**: Ihr API-Schlüssel

## Verwendung

### 🔍 Wettersuche

- **Stadtsuche**: Geben Sie eine Stadt in das Suchfeld ein und drücken Sie Enter oder klicken Sie auf das Suchsymbol
- **Standortsuche**: Klicken Sie auf das Standortsymbol (📍) für das Wetter an Ihrem aktuellen Standort

### ⚙️ Einstellungen

- **Theme wechseln**: Klicken Sie auf das Mondssymbol (🌙) oben rechts für den Dunkelmodus
- **Temperatureinheit**: Klicken Sie auf °F/°C um zwischen Fahrenheit und Celsius zu wechseln

### 📱 Mobile Nutzung

Die App ist vollständig responsive und optimiert für mobile Geräte mit Touch-Navigation.

## Projektstruktur

weather-app/
├── index.html          # Hauptseite mit HTML-Struktur
├── styles.css          # Styling und responsive Design
├── script.js           # JavaScript-Funktionalität
├── README.md           # Diese Dokumentation
└── .env.example        # Beispiel für Umgebungsvariablen

## API-Informationen

Diese App verwendet die **OpenWeatherMap API**:

- **Current Weather Data**: Aktuelle Wetterdaten
- **5 Day Weather Forecast**: 5-Tage Wettervorhersage
- **Geocoding**: Stadtname zu Koordinaten-Umwandlung

### Rate Limits

- Kostenloser Plan: 1.000 API-Aufrufe pro Tag
- Für mehr Anfragen: Upgrade auf einen kostenpflichtigen Plan

## Browser-Kompatibilität

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Browser (iOS Safari, Chrome Mobile)

## Entwicklung

### Lokale Entwicklung

```bash
# Live-Server mit automatischem Reload
npm install -g live-server
live-server
```

### Anpassungen

- **Farben**: Ändern Sie die CSS-Variablen in `:root` für benutzerdefinierte Farbschemata
- **Sprache**: Passen Sie die Texte in HTML und JavaScript für andere Sprachen an
- **API**: Erweitern Sie um zusätzliche API-Endpunkte für mehr Wetterdaten

## Lizenz

MIT License - Freie Nutzung für private und kommerzielle Projekte.

## Credits

- **Wetterdaten**: [OpenWeatherMap](https://openweathermap.org/)
- **Icons**: OpenWeatherMap Weather Icons
- **Fonts**: System-Schriftarten (Segoe UI, etc.)

## Fehlerbehebung

### Häufige Probleme

**Problem**: "Bitte fügen Sie Ihren API-Schlüssel hinzu"

- **Lösung**: Stellen Sie sicher, dass Sie Ihren API-Schlüssel in `script.js` eingefügt haben

**Problem**: "Stadt nicht gefunden"

- **Lösung**: Überprüfen Sie die Schreibweise der Stadt oder verwenden Sie englische Stadtnamen

**Problem**: Standortzugriff verweigert

- **Lösung**: Erlauben Sie Standortzugriff in den Browser-Einstellungen

**Problem**: API-Fehler 401

- **Lösung**: Überprüfen Sie, ob Ihr API-Schlüssel korrekt und aktiv ist

## Support

Bei Fragen oder Problemen erstellen Sie gerne ein Issue im GitHub Repository.
