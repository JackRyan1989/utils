# https://webedit.drexel.edu/sitecore/shell/default.aspx?sc_lang=en
import urllib.request, ssl, subprocess
from bs4 import BeautifulSoup

# Set up some vars
ssl._create_default_https_context = ssl._create_unverified_context
page = "https://webedit.drexel.edu/sitecore/shell/default.aspx?sc_lang=en"
content = urllib.request.urlopen(page)
soup = BeautifulSoup(content, "html.parser")
node = "scContentTreeNode"
x = soup.findAll("div class=scContentTreeNode")
print(x)
