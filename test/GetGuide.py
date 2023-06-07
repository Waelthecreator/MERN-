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
id1 = input("enter id of the guide you want to search: ")
response = session.get(f"http://localhost:5000/guides/{id1}")
print(response.text)

