import requests, csv

all_urls =[]
#csv_files = ['archives_urls.csv' , 'xdl_urls.csv']
csv_files = ["new_urls.csv", 'xdl_urls2.csv']
output_file = ["new_url_output.csv", "url_output.csv", "url_output2.csv"]

for csv_file in csv_files:
    with open(f'../Legacy Center/{csv_file}', newline='') as csvfile:
        urls = csv.reader(csvfile, delimiter=' ')
        for row in urls:
            all_urls.append(row[0])

with open(f"../Legacy Center/{output_file[0]}", mode="w") as output:
    url_writer = csv.writer(output, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for url in all_urls:
        url = url.replace(u'\ufeff', '')
        req = requests.get(url , auth=('user', 'pass'))
        url_writer.writerow([req.status_code, req.url])
        