import urllib.request, re

url = 'https://drexel.edu/undergrad/life-at-drexel/student-stories/'

req = urllib.request.Request(url)
resp = urllib.request.urlopen(req)
respData = resp.read()

# This finds all the h2 elements in the page's html
hTwo = re.findall(r'<h2>(.*?)</h2>',str(respData)) 
# This finds all the anchor tags that have a data-lity attribute on them.  
ytLinks = re.findall(r'<a data-lity(.*?)>',str(respData))
# List out all of the h2 elements:
for text in hTwo:
    print(text)
# List out all of the anchors:
for link in ytLinks:
    print(link)
