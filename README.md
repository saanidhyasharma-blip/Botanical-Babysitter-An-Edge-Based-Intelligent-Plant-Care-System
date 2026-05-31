# Botanical Babysitter 🌿

An Edge-Based Intelligent Plant Care System using ESP32 and IoT automation.

---

## Features
- Real-time temperature and humidity monitoring
- Soil moisture detection
- Automated irrigation system
- Web-based monitoring dashboard (Next.js)
- Manual & automatic control modes
- Edge-based processing
- Smart RGB status indication

---

## Hardware Components
- ESP32
- DHT11 Sensor
- Soil Moisture Sensor
- Soil pH Sensor
- LDR Sensor
- Relay Module
- Water Pump

---

## System Architecture
*(Add architecture image here - e.g., `![Architecture Diagram](docs/Architecture_Diagram.png)`)*

---

## Working Principle
1. Sensors collect environmental data
2. ESP32 processes data locally
3. Decision logic activates actuators
4. Web dashboard displays real-time data

---

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/saanidhyasharma-blip/Botanical-Babysitter-An-Edge-Based-Intelligent-Plant-Care-System.git
cd Botanical-Babysitter-An-Edge-Based-Intelligent-Plant-Care-System
```

### 2. Firmware Setup (Hardware)
1. Open Arduino IDE.
2. Install required libraries: `WiFi.h`, `WebServer.h`, `DHT.h`.
3. Open `firmware/esp32_botanical/esp32_botanical.ino`.
4. Update the WiFi credentials in the code:
   ```cpp
   const char* ssid = "YOUR_WIFI_NAME";
   const char* password = "YOUR_WIFI_PASSWORD";
   ```
5. Upload the firmware to your ESP32.

### 3. Web Dashboard Setup (Software)
The beautiful "Organic Luxury" dashboard is built with Next.js and Tailwind CSS.
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard in your browser. (Default local login: `admin` / `admin`).

---

## Future Enhancements
- Cloud analytics (Supabase integration)
- Weather-aware automation
- Solar-powered operation
- Multi-plant greenhouse support
- Mobile notifications

---

## Contributors
- Saanidhya Sharma (and Team)

---

## License

MIT License
