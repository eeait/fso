const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const config = require("./utils/config")
const { info, logerror } = require("./utils/logger")
const { userExtractor } = require("./middleware")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const dropRouter = require("./controllers/drop")

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
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/drop", dropRouter)

module.exports = app