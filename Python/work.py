import webbrowser, os

websites = [
    'https://ucommweb.teamwork.com/',
    'https://ucommweb.teamwork.com/desk/',
    'https://webedit.drexel.edu/sitecore/login/',
    'https://www-future.drexel.edu/sitecore/login',
    'https://drexeluniversity2.gathercontent.com/',
]

applications = [
    './Desktop/Slack.app',
    './Desktop/*Chrome.app',
    '../../../../Applications/Cisco/*Client.app',
    '../../../../Applications/*Code.app',
    '../../../../Applications/*Outlook.app',
]

for website in websites: 
    webbrowser.open_new(website)

for app in applications:
    os.system("open %s" % (app))