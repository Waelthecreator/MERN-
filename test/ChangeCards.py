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
id1 = input("enter id of the guide you want to update: ")
string = input("enter flashcards semicolon in between (ex: front1; back1; front 2; back 2; (should be a multiple of 2)): ")
array = string.split(";")
array2 = [[array[i],array[i+1]] for i in range(0,len(array), 2)]
print(array2)
cards = {
    "Cards": array2
}
response = session.put(f"http://localhost:5000/guides/info/{id1}", json=cards)
print(response.text)
response = session.get(f"http://localhost:5000/guides/{id1}")
print(response.text)

