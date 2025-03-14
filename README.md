https://port-0-test-server-m7zym17l4e447569.sel4.cloudtype.app/

python Flask Back-end server code

from flask import Flask
from gpiozero import LED
from gpiozero import Servo
#from time import sleep
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #배포된 외부 도메인에서 요청이 들어왔을 경우 cors 허용해주어야 됨
#만약 특정 토메인만 허용하고 싶다면
#CORS(app, resources={r"/*":{"origins":"https://port-0-test-server-m7zym17l4e447569.sel4.cloudtype.app"}})

LED_PIN = 17  # GPIO 17번 핀 사용
SERVO_PIN = 2  # wiringPi 핀 번호

servo = Servo(SERVO_PIN)
led = LED(LED_PIN)

@app.route('/led/run')
def led_run():
    servo.value = 1  # 180도 위치
    time.sleep(3)
    servo.value = -1  # 0도 위치
    return "Invalid angle, please provide an angle between 0 and 180."

@app.route('/')
def index():
    return "Welcome to the LED control server!"  # 기본 페이지

@app.route('/led/on')
def led_on():
    led.on()  # LED ON
    return "LED is ON"

@app.route('/led/off')
def led_off():
    led.off()  # LED OFF
    return "LED is OFF"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
