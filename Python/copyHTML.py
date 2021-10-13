import urllib.request, ssl, argparse, sys
from bs4 import BeautifulSoup

#Initialize argparser:
parser = argparse.ArgumentParser()
parser.add_argument("url", type=str, help="Enter the url for the site whose content you wish to copy.")
parser.add_argument("filename", type=str, help="Enter the name of the file you would like to write the output to. Must be .txt")
args = parser.parse_args()

#Error handler messages:
errorMessages = {
    "invalidURL": "Please enter a valid url that starts with https://",
    "invalidExtension": "Please enter a filename with a valid extension."
}

#Create a secure socket layer
ssl._create_default_https_context = ssl._create_unverified_context

#Grab the url
page = args.url
#Check that the url matches the following formula
if page.startswith('https://'): 
    pass
else: 
    sys.exit(f"{errorMessages['invalidURL']}")
#Get the filename
filename = args.filename
#And get the content
content = urllib.request.urlopen(page)
#Decode the HTML
soup = BeautifulSoup(content, 'html.parser')
try:
    html = soup.findAll("div", id="center-rail")
except: 
    html = soup.findAll("div", id="page")

#check that filename ends with .txt, if it don't exit gracefully
if filename.lower().endswith('.txt'):
    #Create the new file
    with open(f"{filename}", "x+") as newfile:
        newfile.write(str(html))
else: 
    #Terminate the script friendly like
    sys.exit(f"{errorMessages['invalidExtension']}")

