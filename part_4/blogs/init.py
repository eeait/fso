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
    "title": "Oh. My. God.",
    "author": "Janice",
    "url": "https://soannoying.com/",
    "likes": 0
    },
    {
    "title": "How to say 'I know!'",
    "author": "Monica Geller",
    "url": "http://www.cleaners.com",
    "likes": 5
    },
    {
    "title": "We were on a break",
    "author": "Ross and Rachel",
    "url": "http://www.runninggags.com",
    "likes": 236
    },
    {
    "title": "Sluts'r'us",
    "author": "Phoebe",
    "url": "http://www.goofiness.com",
    "likes": 5
    },
    {
    "title": "How to Brew Coffee",
    "author": "Gunther",
    "url": "https://www.centralperk.com",
    "likes": 124
    },
    {
    "title": "How u doin'?",
    "author": "Joey",
    "url": "https://www.tinder.com",
    "likes": 69
    },
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
b2 = requests.post(
    "http://localhost:3001/api/blogs",
    data=json.dumps(blogs[2]),
    headers={
        "Content-Type": "application/json",
        "Authorization": f"bearer {t0}"
    },
)
b3 = requests.post(
    "http://localhost:3001/api/blogs",
    data=json.dumps(blogs[3]),
    headers={
        "Content-Type": "application/json",
        "Authorization": f"bearer {t1}"
    },
)
b4 = requests.post(
    "http://localhost:3001/api/blogs",
    data=json.dumps(blogs[4]),
    headers={
        "Content-Type": "application/json",
        "Authorization": f"bearer {t0}"
    },
)
b5 = requests.post(
    "http://localhost:3001/api/blogs",
    data=json.dumps(blogs[5]),
    headers={
        "Content-Type": "application/json",
        "Authorization": f"bearer {t1}"
    },
)
print("Blogs added")