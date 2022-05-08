const User = require("./models/user")
const jwt = require("jsonwebtoken")

const tokenExtractor = (request) => {
  const auth = request.get("authorization")
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7)
  }
  return null
}

const userExtractor = async (request, response, next) => {
  const token = tokenExtractor(request)
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: "token missing or invalid" })
    }
    const user = await User.findById(decodedToken.id)
    request.user = user
  } else {
    return response
      .status(401)
      .json({ error: "token missing or invalid" })
  }
  next()
}

const checkTitle = async (request, response, next) => {
  const body = request.body
  if (!body.hasOwnProperty("title") || !body.hasOwnProperty("url")) {
    response.status(400).end()
    return
  }
  next()
}

module.exports = { userExtractor, checkTitle }
