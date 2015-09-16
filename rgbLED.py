import RPi.GPIO as GPIO
import time
import requests
import bs4

red = 29
blu = 33
grn = 31

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

GPIO.setup(red, GPIO.OUT)
GPIO.setup(grn, GPIO.OUT) 
GPIO.setup(blu, GPIO.OUT)

GPIO.output(red, 0)
GPIO.output(grn, 0)
GPIO.output(blu, 0)

#file = open('scrape.txt')
#scrape = file.read()

def go():
	GPIO.output(grn, 1)

def caution(): 
	GPIO.output(blu, 1)

def stop(): 
	GPIO.output(red, 1)

def disable():
	GPIO.output(red, 0)
	GPIO.output(blu, 0)
	GPIO.output(grn, 0)

loop = True
while loop:
	html = requests.get('https://beer30.sparcedge.com')
	result = bs4.BeautifulSoup(html.text, 'html.parser')
	scrape = result.findAll('b')
	scrape = str(scrape[0])
	if scrape == "<b>GO</b>":
		go()
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
