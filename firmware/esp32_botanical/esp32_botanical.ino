#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

// ---------- Pin Config ----------
#define DHTPIN 4
#define DHTTYPE DHT11
#define MOISTURE_PIN 34
#define RELAY_PIN 13
#define RED_PIN 14
#define GREEN_PIN 27
#define BLUE_PIN 26

// ---------- Thresholds ----------
#define MOISTURE_THRESHOLD 40   // Below this → water ON
#define HUMIDITY_THRESHOLD 40   // Optional humidity check

// ---------- WiFi Config ----------
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

// ---------- Global Variables ----------
WebServer server(80);
DHT dht(DHTPIN, DHTTYPE);
bool pumpState = false;
bool autoMode = true;  // NEW: Auto mode toggle

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);  // OFF (active LOW)
  
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");
  Serial.println(WiFi.localIP());
  
  // Web routes
  server.enableCORS(true); // Enable CORS for local Next.js app to communicate
  server.on("/", handleRoot);
  server.on("/api/status", handleApiStatus);
  server.on("/on", handlePumpOn);
  server.on("/off", handlePumpOff);
  server.on("/auto", handleAutoMode);
  server.on("/manual", handleManualMode);
  server.begin();
}

void loop() {
  server.handleClient();
  
  int moistureValue = analogRead(MOISTURE_PIN);
  float moisturePercent = map(moistureValue, 4095, 0, 0, 100);
  float humidity = dht.readHumidity();
  float temp = dht.readTemperature();
  
  // Automatic Control - only if auto mode is enabled
  if (autoMode) {
    if (moisturePercent < MOISTURE_THRESHOLD || humidity < HUMIDITY_THRESHOLD) {
      pumpOn();
    } else {
      pumpOff();
    }
  }
  // If manual mode, pump state is controlled only by web buttons
  
  // RGB indication
  if (moisturePercent > 60) setColor(0, 255, 0);     // Green
  else if (moisturePercent > 40) setColor(255, 255, 0); // Yellow
  else setColor(255, 0, 0);                           // Red
  
  delay(5000);
}

// ---------------- Web UI ----------------
void handleRoot() {
  int moistureValue = analogRead(MOISTURE_PIN);
  float moisturePercent = map(moistureValue, 4095, 0, 0, 100);
  float humidity = dht.readHumidity();
  float temp = dht.readTemperature();
  
  String html = "<html><head><title>Smart Plant Monitor</title>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1'>";
  html += "<style>";
  html += "body{font-family:Arial;text-align:center;background:#FFE1FF;padding:20px;}";
  html += "button{padding:15px 25px;font-size:16px;margin:10px;border:none;border-radius:8px;cursor:pointer;}";
  html += "button:hover{opacity:0.8;}";
  html += ".container{max-width:600px;margin:auto;background:white;padding:20px;border-radius:15px;box-shadow:0 4px 6px rgba(0,0,0,0.1);}";
  html += ".status{font-size:18px;margin:15px 0;padding:10px;background:#f0f0f0;border-radius:5px;}";
  html += ".mode-badge{display:inline-block;padding:5px 15px;border-radius:20px;font-weight:bold;margin-left:10px;}";
  html += ".auto{background:#90EE90;color:#006400;}";
  html += ".manual{background:#FFB6C1;color:#8B0000;}";
  html += "</style></head><body>";
  
  html += "<div class='container'>";
  html += "<h2>🌿 Smart Plant Monitoring System</h2>";
  
  // Mode indicator
  html += "<div class='status'>";
  html += "<b>Control Mode:</b> ";
  html += "<span class='mode-badge " + String(autoMode ? "auto" : "manual") + "'>";
  html += autoMode ? "AUTOMATIC" : "MANUAL";
  html += "</span></div>";
  
  // Sensor readings
  html += "<div class='status'><b>🌡️ Temperature:</b> " + String(temp) + " °C</div>";
  html += "<div class='status'><b>💧 Humidity:</b> " + String(humidity) + " %</div>";
  html += "<div class='status'><b>🌱 Soil Moisture:</b> " + String(moisturePercent) + " %</div>";
  html += "<div class='status'><b>⚙️ Pump Status:</b> " + String(pumpState ? "ON 💧" : "OFF 💤") + "</div>";
  
  // Mode control buttons
  html += "<hr>";
  html += "<h3>Mode Selection</h3>";
  if (autoMode) {
    html += "<a href=\"/manual\"><button style='background:#FFB6C1;'>Switch to MANUAL Control</button></a>";
  } else {
    html += "<a href=\"/auto\"><button style='background:#90EE90;'>Switch to AUTOMATIC Control</button></a>";
  }
  
  // Pump control buttons (only shown in manual mode)
  html += "<hr>";
  html += "<h3>Pump Controls</h3>";
  if (!autoMode) {
    html += "<a href=\"/on\"><button style='background:lightgreen;'>Turn Pump ON 💧</button></a>";
    html += "<a href=\"/off\"><button style='background:lightcoral;'>Turn Pump OFF ⛔</button></a>";
  } else {
    html += "<p style='color:#666;'>(Pump is controlled automatically based on moisture levels)</p>";
  }
  
  html += "</div></body></html>";
  
  server.send(200, "text/html", html);
}

void handleApiStatus() {
  int moistureValue = analogRead(MOISTURE_PIN);
  float moisturePercent = map(moistureValue, 4095, 0, 0, 100);
  float humidity = dht.readHumidity();
  float temp = dht.readTemperature();
  
  String json = "{";
  json += "\"temperature\":" + String(temp) + ",";
  json += "\"humidity\":" + String(humidity) + ",";
  json += "\"moisture\":" + String(moisturePercent) + ",";
  json += "\"pumpState\":" + String(pumpState ? "true" : "false") + ",";
  json += "\"autoMode\":" + String(autoMode ? "true" : "false");
  json += "}";
  
  server.send(200, "application/json", json);
}

void handlePumpOn() {
  if (!autoMode) {  // Only allow manual control when not in auto mode
    pumpOn();
  }
  server.sendHeader("Location", "/");
  server.send(303);
}

void handlePumpOff() {
  if (!autoMode) {  // Only allow manual control when not in auto mode
    pumpOff();
  }
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleAutoMode() {
  autoMode = true;
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleManualMode() {
  autoMode = false;
  server.sendHeader("Location", "/");
  server.send(303);
}

// ---------------- Helper Functions ----------------
void pumpOn() {
  digitalWrite(RELAY_PIN, LOW);
  pumpState = true;
  Serial.println("Pump turned ON");
}

void pumpOff() {
  digitalWrite(RELAY_PIN, HIGH);
  pumpState = false;
  Serial.println("Pump turned OFF");
}

void setColor(int r, int g, int b) {
  analogWrite(RED_PIN, r);
  analogWrite(GREEN_PIN, g);
  analogWrite(BLUE_PIN, b);
}
