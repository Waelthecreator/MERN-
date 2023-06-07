import requests

session = requests.Session()

name = input("enter name: ")
user = {
    "Username":name,
    "Password":name
}
response = session.post("http://localhost:5000/users/login",json=user)
print(response.text)
response = session.get("http://localhost:5000/users/")
print(response.text)
id1 = input("Enter the id of the guide you want to ")
priv = (input("enter True for public and False for private: "))
if priv == "True":
    privacy = True
else:
    privacy = False
response = session.put(f"http://localhost:5000/guides/access/{id1}", json={"access":privacy})
print(response.text)
response = session.get(f"http://localhost:5000/guides/{id1}")
print(response.text)
