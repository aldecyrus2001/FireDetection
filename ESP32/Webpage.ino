#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <Preferences.h>

Preferences preferences;

String SSID = "";
String WifiPassword = "";

WebServer server(80);

const char custom_html[] = R"rawliteral(<!DOCTYPE html><html lang="en"><head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ESP 32 SETUP</title>
  <style>
        * {
            padding: 0;
            margin: 0;
            font-family: 'Courier New', Courier, monospace;
        }


        .modalContainer {
            background: rgba(175, 175, 175, 0.473);
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: static;
        }

        .wifiModal {
            background: rgb(255, 255, 255);
            width: 80%;
            height: 80%;
            position: fixed;
            display: flex;
            justify-self: center;
            border-radius: 20px;
            padding: 20px;
            flex-direction: column;
            gap: 10px;
        }

        .modalTitle {
            width: 100%;
            padding-bottom: 10px;
            height: max-content;
            border-bottom: 1px solid black;
        }

        .wifiMainContainer {
            position: relative;
            height: 100%;
            width: 100%;
        }

        .wifiListsContainer {
            display: flex;
            flex-direction: column;
            gap: 10px;
            overflow: scroll;
            width: 100%;
        }

        .wifiListsContainer::-webkit-scrollbar {
            width: 0px;
        }

        .wifiInformation {
            display: flex;
            padding: 20px;
            background-color: rgba(236, 236, 236, 0.918);
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-radius: 10px;
            cursor: pointer;
        }

        .wifiButton {
            padding: 3px;
            width: 20px;
        }

        .loader {
            width: 50px;
            height: 50px;
            display: none;
            justify-content: center;
        }

        .isVisible {
            display: flex !important;
        }

        .wifiCred {
            width: 100%;
            flex-direction: column;
            position: absolute;
            bottom: 0;
            gap: 5px;
            display: none;
            justify-content: center;
        }

        .password {
            width: 100%;
        }

        .password input {
            padding: 3px
        }

        .button {
            width: 100%;
            display: flex;
            justify-content: center;
        }

        .button button {
            padding: 3px 10px;
        }

        .ssid {
            font-weight: 900;
        }

        .status {
            display: none;
        }

        
    </style>
</head>
<body>
  <div class="modalContainer">
        <div class="wifiModal">
            <div class="modalTitle">
                <h1>Wifi Management</h1>
            </div>
            <div class="isVisible loader">
                <p>Loading ...</p>
            </div>
            <div class="status">
                <p class="connectionMessage">Successfully Connected!</p>
                <p class="ipAddress">Ip Address: 192.168.1.1</p>
                <a id="proceedLink" href="#">Click here to proceed!</a>
            </div>
            <div class="wifiMainContainer">
                <div id="wifiList" class="wifiListsContainer">
                </div>
                <div class="wifiCred">
                    <div class="ssid">
                        <span>SSID : </span>
                        <span class="ssidName"></span>
                    </div>
                    <div class="password">
                        <input class="password" type="password">
                    </div>
                    <div class="button">
                        <button class="buttonConnect">Connect</button>
                    </div>
                </div>
            </div>
            

        </div>
    </div>

    <script>
        const wifiListContainer = document.getElementById('wifiList');
        const wifiMainContainer = document.querySelector('.wifiMainContainer');
        const wifiCredContainer = document.querySelector('.wifiCred');
        const ssidContainer = document.querySelector('.ssidName');
        const buttonConnect = document.querySelector('.buttonConnect');
        const passwordInput = document.querySelector('.password input');
        const loader = document.querySelector('.loader');
        const status = document.querySelector('.status');
        const ipAddress = document.querySelector('.ipAddress');

        function fetchWifiNetworks() {
        fetch('/scan')
            .then(response => response.json())
            .then(networks => {
                wifiMainContainer.classList.add('isVisible');
                loader.classList.remove('isVisible');
                wifiListContainer.innerHTML = '';
                const fragment = document.createDocumentFragment();

                networks.forEach(({ ssid, rssi }) => {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'wifiInformation';
                    wrapper.innerHTML = `
                    <span>${ssid}</span>
                    <img class="wifiButton" src="Asset/wi-fi.png" alt="WiFi Icon">
                    `;
                    fragment.appendChild(wrapper);
                });

                wifiListContainer.appendChild(fragment);

                document.querySelectorAll('.wifiInformation').forEach(el => {
                    el.addEventListener('click', () => {
                    wifiCredContainer.classList.add('isVisible');
                    const ssid = el.querySelector('span')?.textContent || 'Unknown';
                    ssidContainer.textContent = ssid;
                    });
                });
            })
            .catch(err => {

                console.error('Error fetching WiFi networks:', err);
            });
        }

        window.onload = fetchWifiNetworks;

        buttonConnect.addEventListener('click', () => {
            const ssid = ssidContainer.textContent;
            const password = passwordInput.value;

            fetch('/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ssid, password })
            })
            .then(response => response.json())
            .then(data => {
                const connectionMessage = document.querySelector('.connectionMessage');
                if (data.ip) {
                    status.classList.add('isVisible');
                    wifiMainContainer.classList.remove('isVisible');
                    ipAddress.textContent = `IP Address: ${data.ip}`;
                    connectionMessage.textContent = 'Successfully Connected!';
                    document.getElementById('proceedLink').href = `http://${data.ip}`;
                    document.getElementById('proceedLink').style.display = 'inline';
                } 

                
                alert(data.message || 'Connection status unknown');
            })
            .catch(err => {
                wifiMainContainer.classList.add('isVisible');
                console.error('Connection error:', err);
            });
        });
    </script>
</body>
</html>
)rawliteral";

void handleRoot() {
  server.send(200, "text/html", custom_html);
}

void handleScan() {
  int n = WiFi.scanNetworks();
  if (n == 0) {
    server.send(200, "application/json", "[]");
    return;
  }

  StaticJsonDocument<1024> doc;
  JsonArray array = doc.to<JsonArray>();

  for (int i = 0; i < n; i++) {
    JsonObject network = array.createNestedObject();
    network["ssid"] = WiFi.SSID(i);
    network["rssi"] = WiFi.RSSI(i);
    network["channel"] = WiFi.channel(i);

    // Convert encryption enum to string
    String enc;
    switch (WiFi.encryptionType(i)) {
      case WIFI_AUTH_OPEN: enc = "open"; break;
      case WIFI_AUTH_WEP: enc = "WEP"; break;
      case WIFI_AUTH_WPA_PSK: enc = "WPA"; break;
      case WIFI_AUTH_WPA2_PSK: enc = "WPA2"; break;
      case WIFI_AUTH_WPA_WPA2_PSK: enc = "WPA+WPA2"; break;
      case WIFI_AUTH_WPA2_ENTERPRISE: enc = "WPA2-EAP"; break;
      case WIFI_AUTH_WPA3_PSK: enc = "WPA3"; break;
      case WIFI_AUTH_WPA2_WPA3_PSK: enc = "WPA2+WPA3"; break;
      case WIFI_AUTH_WAPI_PSK: enc = "WAPI"; break;
      default: enc = "unknown"; break;
    }
    network["encryption"] = enc;
  }

  String output;
  serializeJson(doc, output);
  server.send(200, "application/json", output);

  WiFi.scanDelete();
}

void handleConnect() {
  if (!server.hasArg("plain")) {
    server.send(400, "application/json", "{\"message\":\"No body\"}");
    return;
  }

  String body = server.arg("plain");
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, body);

  if (error) {
    server.send(400, "application/json", "{\"message\":\"Invalid JSON\"}");
    return;
  }

  const char* ssid = doc["ssid"];
  const char* password = doc["password"];

  Serial.printf("Trying to connect to SSID: %s with password: %s\n", ssid, password);

  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid, password);

  unsigned long startAttemptTime = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 20000) {
    delay(100);
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());

    // Attempt to access google.com
    HTTPClient http;
    http.begin("https://www.google.com");
    int httpCode = http.GET();
    http.end();

    if (httpCode > 0) {
        preferences.putString("SSID", ssid);
        preferences.putString("WifiPassword", password);
        Serial.println("Internet access verified!");
        server.send(200, "application/json", "{\"message\":\"Connected successfully! Internet access verified.\", \"ip\":\"" + WiFi.localIP().toString() + "\"}");
    } else {
      Serial.println("No internet access.");
      server.send(200, "application/json", "{\"message\":\"Connected to WiFi but no internet access.\", \"ip\":\"" + WiFi.localIP().toString() + "\"}");
    }
  } else {
    Serial.println("Failed to connect.");
    server.send(200, "application/json", "{\"message\":\"Failed to connect.\"}");
  }
}

void setup() {
  Serial.begin(115200);

  preferences.begin("my-app", false);

  if (!preferences.isKey("SSID")) {
    preferences.putString("SSID", "");  // Initialize as empty string
    Serial.println("Initialized SSID in Preferences");
  }

  if (!preferences.isKey("WifiPassword")) {
    preferences.putString("WifiPassword", "");  // Initialize as empty string
    Serial.println("Initialized WifiPassword in Preferences");
  }

    SSID = preferences.getString("SSID", "");
    WifiPassword = preferences.getString("WifiPassword", "");

    Serial.print("Loaded SSID: '"); Serial.print(SSID); Serial.println("'");
    Serial.print("Loaded WIFI Password: '"); Serial.print(WifiPassword); Serial.println("'");

  

  // Setup WiFi in STA mode (required for scanning)
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();  // disconnect from any AP

  delay(100);

  // Start AP (optional, to serve the webpage)
  WiFi.softAP("ESP32_Setup", "12345678");

  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);

  // Add handlers
  server.on("/", handleRoot);
  server.on("/scan", handleScan); 
  server.on("/connect", HTTP_POST, handleConnect);

  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
}