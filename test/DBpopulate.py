import requests

user1 = {
    "Name": "zac",
    "Username": "zac",
    "Password": "zac"
}
user2 = {
    "Name": "john",
    "Username": "john",
    "Password": "john"
}
user3 = {
    "Name": "may",
    "Username": "may",
    "Password": "may"
}
user4 = {
    "Name": "chris",
    "Username": "chris",
    "Password": "chris"
}
user5 = {
    "Name": "will",
    "Username": "will",
    "Password": "will"
}
user6 = {
    "Name": "noah",
    "Username": "noah",
    "Password": "noah"
}
user7 = {
    "Name": "moe",
    "Username": "moe",
    "Password": "moe"
}
user8 = {
    "Name": "jack",
    "Username": "jack",
    "Password": "jack"
}
user9 = {
    "Name": "smith",
    "Username": "smith",
    "Password": "smith"
}
user10 = {
    "Name": "sam",
    "Username": "sam",
    "Password": "sam"
}
response = requests.post("http://localhost:5000/users/signup", json=user1)
print(response.json())
response = requests.post("http://localhost:5000/users/signup", json=user2)
print(response.json())
response = requests.post("http://localhost:5000/users/signup", json=user3)
print(response.json())
response = requests.post("http://localhost:5000/users/signup", json=user4)
print(response.json())
response = requests.post("http://localhost:5000/users/signup", json=user5)
print(response.json())
response = requests.post("http://localhost:5000/users/signup", json=user6)
print(response.json())
response = requests.post("http://localhost:5000/users/signup", json=user7)
print(response.json())
response = requests.post("http://localhost:5000/users/signup", json=user8)
print(response.json())
response = requests.post("http://localhost:5000/users/signup", json=user9)
print(response.json())
response = requests.post("http://localhost:5000/users/signup", json=user10)
print(response.json())
