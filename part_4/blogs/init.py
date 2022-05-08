import requests
import json

users = [
    {
    "username": "united_kingdom",
    "name": "London Heathrow",
    "password": "Airport"
    },
    {
    "username": "germany",
    "name": "Berlin Tegel",
    "password": "Flughafen"
    }
]
blogs = [
    {
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": 7
    },
    {
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": 5
    }
]

drop = requests.post("http://localhost:3001/api/drop")
print("Database emptied")

u0 = requests.post(
    "http://localhost:3001/api/users",
    data=json.dumps(users[0]),
    headers={"Content-Type": "application/json"},
)
u1 = requests.post(
    "http://localhost:3001/api/users",
    data=json.dumps(users[1]),
    headers={"Content-Type": "application/json"},
)
print("Users added")

l0 = requests.post(
    "http://localhost:3001/api/login",
    data=json.dumps({
        "username": users[0]["username"],
        "password": users[0]["password"]
    }),
    headers={"Content-Type": "application/json"},)
l1 = requests.post(
    "http://localhost:3001/api/login",
    data=json.dumps({
        "username": users[1]["username"],
        "password": users[1]["password"]
    }),
    headers={"Content-Type": "application/json"},)
print("Users logged in")

t0 = str(json.loads(l0.text)["token"])
t1 = str(json.loads(l1.text)["token"])

b0 = requests.post(
    "http://localhost:3001/api/blogs",
    data=json.dumps(blogs[0]),
    headers={
        "Content-Type": "application/json",
        "Authorization": f"bearer {t0}"
    },
)
b1 = requests.post(
    "http://localhost:3001/api/blogs",
    data=json.dumps(blogs[1]),
    headers={
        "Content-Type": "application/json",
        "Authorization": f"bearer {t1}"
    },
)
print("Blogs added")