import requests

session = requests.Session()

name = input("enter name: ")
user = {
    "Username":name,
    "Password":name
}
response = session.post("http://localhost:5000/users/login",json=user)
print(response.text)
title = input("Enter title of new guide which will be public: ")
guide = {
    "Title": title
}
response = session.post("http://localhost:5000/guides", json=guide)
print(response.text)
response = session.get("http://localhost:5000/users/")
data = response.json()
guides = data["guides"]
id1 = ""
for guide in guides:
    if guide["Name"] == title:
        id1 = guide["_id"]
response = session.put(f"http://localhost:5000/guides/access/{id1}", json={"access":True})
print(response.text)
response = session.get(f"http://localhost:5000/guides/{id1}")
print(response.text)
response = session.get("http://localhost:5000/users/logout")
print(response.text)
response = session.get(f"http://localhost:5000/guides/{id1}")
print(response.text)
