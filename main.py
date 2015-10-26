
import json
my_data = json.loads(open("libraryd.json").read())

target = open("magnets.txt", 'w+')


a = []

for item in my_data:
   a.append(item['media-data']['alexandria-media']['torrent'])

print target.read()
target.truncate()
for item in a:
  target.write("%s\n" % item)

target.close

