const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test("correct number of blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(response.body).toHaveLength(initialBlogs.length)
})

test("key 'id' is found", async () => {
  const response = await api.get("/api/blogs")

  const firstBlog = response.body[0]
  // console.log(firstBlog)
  expect(firstBlog.id).toBeDefined()
})

test("blogs can be added", async () => {
  let blogObject = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }
  await api
    .post("/api/blogs")
    .send(blogObject)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test("likes default to 0", async () => {
  let blogObject = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  }
  await api
    .post("/api/blogs")
    .send(blogObject)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")
  expect(response.body[response.body.length - 1].likes).toBe(0)
})

test("title and url are required", async () => {
  let blogObject = {
    title: "Tests suck",
    author: "Edsger W. Dijkstra",
  }
  await api.post("/api/blogs").send(blogObject).expect(400)
})

test("delete removes 1", async () => {
  const allBefore = (await api.get("/api/blogs")).body
  const lengthBefore = allBefore.length
  const id = allBefore[0].id
  await api.delete(`/api/blogs/${id}`).expect(204)

  allAfter = (await api.get("/api/blogs")).body
  expect(allAfter.length).toBe(lengthBefore - 1)
})

test("put makes url bing.com", async () => {
  const allBefore = (await api.get("/api/blogs")).body
  const firstBefore = allBefore[0]
  const id = firstBefore.id.toString()

  const firstAfter = {
    title: firstBefore.title,
    author: firstBefore.author,
    url: "bing.com",
    likes: firstBefore.likes,
  }

  await api.put(`/api/blogs/${id}`).send(firstAfter).expect(200)
  const allAfter = (await api.get("/api/blogs")).body
  expect(allAfter[0].url).toBe("bing.com")
})

afterAll(() => {
  mongoose.connection.close()
})
