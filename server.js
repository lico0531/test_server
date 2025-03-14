const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.static("public")); // 정적 파일(css, js) 제공

app.get("/led/:state", async (req, res) => {
    const state = req.params.state; // "on" 또는 "off"
    try {
        await axios.get(`http://192.168.219.108:8080/led/${state}`); // 라즈베리파이에 요청(로컬ip)
        //await axios.get(`http://115.143.41.38:8080/led/${state}`); // 라즈베리파이 공인ip
        res.send(`LED turned ${state}`);
    } catch (error) {
        res.status(500).send("Error controlling LED");
    }
});

/*
// 서보 모터를 90도로 이동
axios.get('http://192.168.1.100:8080/servo/90')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log('Error:', error);
  });
*/
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
