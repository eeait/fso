const http = require("http")
const express = require("express")

const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const { info } = require("./utils/logger")
require("dotenv").config()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model("Blog", blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then((result) => {
    info("connected to MongoDB")
  })
  .catch((error) => {
    info("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.json())

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const { PORT } = process.env
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
