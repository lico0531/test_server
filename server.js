/*
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.static("public")); // 정적 파일(css, js) 제공

app.get("/led/:state", async (req, res) => {
    const state = req.params.state; // "on" 또는 "off"
    try {
        //await axios.get(`http://192.168.219.108:8080/led/${state}`); // 라즈베리파이에 요청(로컬ip) 승헌집
        //await axios.get(`http://115.143.41.38:8080/led/${state}`); // 라즈베리파이 공인ip
        //await axios.get(`http://10.31.11.62:8080/led/${state}`); //SKU 게스트ip 안됨
        await axios.get(`http://192.168.65.143:8080/led/${state}`); //승헌 핫스팟팟

        res.send(`LED turned ${state}`);
    } catch (error) {
        res.status(500).send("Error controlling LED");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
*/
const express = require("express");
const mqtt = require("mqtt");
const app = express();
const port = 3000;

app.use(express.static("public")); // 정적 파일(css, js) 제공

// MQTT 연결 (HiveMQ public broker)
//const client = mqtt.connect("mqtt://broker.hivemq.com"); //TEST할때때

const options = {
  host: '225b69c8b10a49069df4af980faab3f5.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts', // s 붙여야 TLS 연결
  username: 'shlico0531',
  password: 'Shsh0531'
};
const client = mqtt.connect(options);

client.on("connect", () => {
  console.log("MQTT connected");
});

// 라우터 - led on/off 명령 전송
app.get("/led/:state", (req, res) => {
  const state = req.params.state; // 'on' or 'off'
  if (state === 'on' || state === 'off') {
    client.publish('umbrella/led', state);
    res.send(`MQTT LED command sent: ${state}`);
  } else {
    res.status(400).send("Invalid command");
  }
});

// 라우터 - 서보 동작 명령 전송
app.get("/servo/run", (req, res) => {
  client.publish('umbrella/servo', 'run');
  res.send("MQTT Servo run command sent");
});

app.listen(port, () => {
  console.log(`Node server running at http://localhost:${port}`);
});