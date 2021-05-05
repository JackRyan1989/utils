import urllib.request, ssl, pyperclip, subprocess
from bs4 import BeautifulSoup

#Set up some vars
ssl._create_default_https_context = ssl._create_unverified_context

#Paste in the copied URL
page = pyperclip.paste()
content = urllib.request.urlopen(page)
#Decode the HTML
soup = BeautifulSoup(content, 'html.parser')
try:
    x = soup.findAll("div", id="center-rail")
except: 
    x = soup.findAll("div", id="page")
subprocess.run("pbcopy", universal_newlines=True, input=str(x))
