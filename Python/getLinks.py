import urllib.request
import re
import csv

url = 'https://drexel.edu/undergrad/life-at-drexel/student-stories/'

req = urllib.request.Request(url)
resp = urllib.request.urlopen(req)
respData = resp.read()

hTwo = re.findall(r'<h2>(.*?)</h2>',str(respData))   
ytLinks = re.findall(r'<a data-lity(.*?)>',str(respData))
for text in hTwo:
    print(text)

for link in ytLinks:
    print(link)
