import requests

print("getting the 4 guides which will be displayed on Home Screen")
resp = requests.get("http://localhost:5000/")
print(resp.text)
print("getting all public guides")
resp = requests.get("http://localhost:5000/all")
print(resp.text)