const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")
const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
]
const initialUsers = [
  {
    username: "london",
    name: "London Heathrow",
    password: "Airport",
  },
  {
    username: "berlin",
    name: "Berlin Tegel",
    password: "Flughafen",
  },
]

beforeEach(async () => {
  // init blogs
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  // init users
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})

describe("response is good when", () => {
  test("username is too short", async () => {
    const invalidUser = {
      username: "h",
      name: "Helsinki H-V",
      password: "Lentokenttä",
    }

    let response = await api.post("/api/users").send(invalidUser)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toContain("username too short")
  })

  test("password is too short", async () => {
    const invalidUser = {
      username: "helsinki",
      name: "Helsinki H-V",
      password: "LK",
    }

    let response = await api.post("/api/users").send(invalidUser)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toContain("password too short")
  })

  test("username is taken", async () => {
    const invalidUser = {
      username: "london",
      name: "Helsinki H-V",
      password: "Lentokenttä",
    }

    let response = await api.post("/api/users").send(invalidUser)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toContain("taken")
  })
})

afterAll(() => {
  mongoose.connection.close()
})
