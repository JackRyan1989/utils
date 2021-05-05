import subprocess, pyperclip

data = pyperclip.paste()
new = data.title()

subprocess.run("pbcopy", universal_newlines=True, input=new)

