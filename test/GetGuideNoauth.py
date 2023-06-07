import requests

name = input("Enter User: ")
user = {
    "Username": name,
    "Password":name
}
title = input("Enter title of new guide: ")
guide = {
    "Title": title
}
session = requests.Session()
response = session.post("http://localhost:5000/users/login",json=user)
print(response.text)
response = session.post("http://localhost:5000/guides", json=guide)
print(response.text)
response = session.get("http://localhost:5000/users/")
data = response.json()
guides = data["guides"]
id1 = ""
for guide in guides:
    if guide["Name"] == title:
        id1 = guide["_id"]

response = session.get("http://localhost:5000/users/logout")
print(response.text)
response = session.get(f"http://localhost:5000/guides/{id1}")
print(response.text)


