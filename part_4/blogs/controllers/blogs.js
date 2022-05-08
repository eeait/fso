const blogsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const { info } = require("../utils/logger")
const { userExtractor, checkTitle } = require("../middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  })
  response.json(blogs)
})

blogsRouter.post("/", checkTitle, userExtractor, async (request, response) => {
  const body = request.body
  if (!body.hasOwnProperty("title") || !body.hasOwnProperty("url")) {
    response.status(400).end()
    return
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const adderId = blog.user.toString()

  const trier = request.user
  console.log("trier:", trier)
  const trierId = trier._id.toString()

  if (adderId !== trierId) {
    return response
      .status(403)
      .json({ error: "no permission to delete" })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", (request, response) => {
  const body = request.body
  const blog = new Blog({
    _id: request.params.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).then(
    (updatedBlog) => {
      response.json(updatedBlog)
    }
  )
})

module.exports = blogsRouter
