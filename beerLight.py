import RPi.GPIO as GPIO
import time
import requests
import bs4

red = 29
yel = 33

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

GPIO.setup(red, GPIO.OUT)
GPIO.setup(yel, GPIO.OUT)

GPIO.output(red, 0)
GPIO.output(yel, 0)

def go():
	GPIO.output(grn, 1)

def caution(): 
	GPIO.output(yel, 1)
	GPIO.output(red, 0)
def stop(): 
	GPIO.output(red, 1)
	GPIO.output(yel, 0)

def disable():
	GPIO.output(red, 0)
	GPIO.output(yel, 0)

loop = True
while loop:
	html = requests.get('https://beer30.sparcedge.com')
	result = bs4.BeautifulSoup(html.text, 'html.parser')
	scrape = result.findAll('b')
	scrape = str(scrape[0])
	if scrape == "<b>GO</b>":
		caution()
	elif scrape == "<b>CAUTION</b>":
		caution()
	elif scrape == "<b>STOP</b>": 
		stop()
	else: 
		disable()
		break
	scrape = "none"
	time.sleep(1)

GPIO.cleanup()
