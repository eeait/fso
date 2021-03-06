const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  if (username.length < 3) {
    response.status(400).json({
      error: "username too short (min 3)",
    })
    return
  }
  if (password.length < 3) {
    response.status(400).json({
      error: "password too short (min 3)",
    })
    return
  }
  if (
    (await User.find({})).map((u) => u.username).includes(username)
  ) {
    response.status(400).json({
      error: "username taken",
    })
    return
  }

  const salt = 10
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
  })
  response.json(users)
})

module.exports = usersRouter
