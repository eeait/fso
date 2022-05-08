const dropRouter = require("express").Router()
const User = require("../models/user")
const Blog = require("../models/blog")

dropRouter.post("/", async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  response.status(200).json()
})

module.exports = dropRouter