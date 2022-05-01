const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const config = require("./utils/config")
const { info, logerror } = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then((result) => {
    info("Connected to MongoDB")
  })
  .catch((error) => {
    logerror("Error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)

module.exports = app